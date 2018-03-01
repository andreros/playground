#!/usr/bin/env python
# title           :googlescraper.py
# description     :Google scraper class implementation.
# author          :André Rosa
# date            :2016/07/12
# version         :0.1dev
# python_version  :3.5.2
# ==============================================================================

# Import the modules needed to run the script.
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

from src.scraper.basescraper import BaseScraper


class GoogleScraper(BaseScraper):

    def __init__(self, driver=None):
        super().__init__(driver)

    def lookup(self, query):
        """
        Lookup method

        :param query: The keywords to be searched
        """
        self.browser.get("http://www.google.com")

        try:
            box = self.browser.wait.until(EC.presence_of_element_located((By.NAME, "q")))
            button = self.browser.wait.until(EC.element_to_be_clickable((By.NAME, "btnK")))
            box.send_keys(query)
            try:
                button.click()
            except ElementNotVisibleException:
                button = self.browser.wait.until(EC.visibility_of_element_located((By.NAME, "btnG")))
                button.click()
        except TimeoutException:
            print("Box or Button not found in google.com")

    def __str__(self):
        return "GoogleScraper target browser is %s | webdriver is %s" % (self.driver, self.browser)
