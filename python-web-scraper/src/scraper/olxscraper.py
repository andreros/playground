#!/usr/bin/env python
# title           :googlescraper.py
# description     :Google scraper class implementation.
# author          :André Rosa
# date            :2016/07/12
# version         :0.1dev
# python_version  :3.5.2
# ==============================================================================

# Import the modules needed to run the script.
from src.scraper.basescraper import BaseScraper


class OlxScraper(BaseScraper):

    def __init__(self, driver=None):
        super().__init__(driver)
        self.browser.get("http://www.olx.pt")

    def __str__(self):
        return "OlxScraper target browser is %s | webdriver is %s" % (self.driver, self.browser)
