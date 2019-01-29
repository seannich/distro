import sys
import os.path as osp
import traceback
import argparse

from time import time, sleep
from abc import abstractmethod

import boinc_path_config
import database
from boinc_db import *
from sched_messages import SchedMessages, CRITICAL, NORMAL, DEBUG
from create_work import create_work, CheckOutputError


class WorkGenerator(object):
    def __init__(self, appname):
        parser = self.parser = argparse.ArgumentParser(prog='work_generator')
        parser.add_argument(
            '-c', '--cushion', nargs=1, default=2000, type=int,
            help='number of jobs to keep available')
        parser.add_argument(
            '-mjc', '--max_jobs_create', nargs=1, default=50, type=int,
            help=('maximum number jobs to create in one pass, before waiting '
                  'for transitioner'))
        parser.add_argument(
            '-si', '--sleep_interval', nargs=1, default=5, type=int,
            help='how many seconds to sleep between passes')
        parser.add_argument(
            '-d', '--debug', action='store_true', default=False,
            help='print out debug messages')

        self.add_args(parser)
        self.args = vars(parser.parse_args())

        self.appname = appname
        self.log = SchedMessages()
        self.log.set_debug_level(DEBUG if self.args['debug'] else NORMAL)

    def add_args(self, parser):
        """
        Override to add own custom arguments.
        """
        pass

    @abstractmethod
    def make_jobs(self, num=1):
        raise NotImplementedError()

    def run(self):
        database.connect()
        dbconnection = database.get_dbconnection()
        cursor = dbconnection.cursor()

        while True:
            if osp.exists('../stop_daemons'):
                self.log.printf(NORMAL, "Stop deamons file found.\n")
                sys.exit()

            try:
                dbconnection.commit()
                app = database.Apps.find1(name=self.appname)
                num_unsent = database.Results.count(
                    app=app, server_state='RESULT_SERVER_STATE_UNSENT')

                if num_unsent < self.args['cushion'][0]:

                    num_create = self.args['cushion'][0]-num_unsent
                    self.log.printf(
                        NORMAL, "%i unsent results. Creating %i more.\n",
                        num_unsent, num_create)

                    self.make_jobs(num=min(self.args['max_jobs_create'],
                                   num_create))

                    # wait for transitioner to create jobs
                    now = int(time())
                    while True:
                        self.log.printf(DEBUG, "Waiting for transitioner...\n")
                        dbconnection.commit()
                        cursor.execute(
                            "select min(transition_time) as t from workunit")
                        if cursor.fetchone()['t'] > now:
                            break
                        sleep(1)

                    self.log.printf(DEBUG, "Created.\n")
                    continue

                else:
                    self.log.printf(DEBUG, "%i unsent results.\n", num_unsent)

            except CheckOutputError:
                pass
            except Exception as e:
                self.log.printf(CRITICAL, "Error: %s\n", str(e))
                traceback.print_exception(
                    type(e), e, sys.exc_info()[2], None, sys.stderr)
                sys.exit()

            sleep(int(self.args['sleep_interval'][0]))
