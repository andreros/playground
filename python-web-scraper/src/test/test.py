#!/usr/bin/env python
# title           :test.py
# description     :Script file for testing the scrapers.
# author          :André Rosa
# date            :2016/07/12
# version         :0.1dev
# usage           :python test.py [-d] Firefox|Chrome [-t] All|Google|Olx
# notes           :
# python_version  :3.5.2
# ==============================================================================

# Import the modules needed to run the script.
import argparse
import time
from src.scraper.googlescraper import GoogleScraper
from src.scraper.olxscraper import OlxScraper

parser = argparse.ArgumentParser(description='Text file conversion.')
parser.add_argument("-d", "--driver", default="Firefox",
                    help="Webdriver to use. Options are 'Firefox', 'FirefoxHeadless', 'Chrome' or 'Phantom'. Default is 'Firefox'.")
parser.add_argument("-t", "--test", default="All",
                    help="Test to perform. Options are 'All', 'Google' or 'Olx'. Default is 'All'.")
args = parser.parse_args()
print(args)

if __name__ == "__main__":

    driver = 'Firefox'

    if args.driver:
        if args.driver == 'Firefox' \
                or args.driver == 'FirefoxHeadless' \
                or args.driver == 'Chrome' \
                or args.driver == 'Phantom':
            driver = args.driver

    if args.test == 'All':
        gScraper = GoogleScraper(driver)
        print(gScraper)
        olxScraper = OlxScraper(driver)
        print(olxScraper)
        gScraper.lookup("Selenium")
        time.sleep(5)
        gScraper.quit()
        olxScraper.quit()
    elif args.test == 'Google':
        gScraper = GoogleScraper(driver)
        print(gScraper)
        gScraper.lookup("Selenium")
        time.sleep(5)
        gScraper.quit()
    elif args.test == 'Olx':
        olxScraper = OlxScraper(driver)
        print(olxScraper)
        time.sleep(5)
        olxScraper.quit()
