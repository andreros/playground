#!/usr/bin/env python
# title           :basescraper.py
# description     :Base scraper class implementation.
# author          :André Rosa
# date            :2016/07/12
# version         :0.1dev
# python_version  :3.5.2
# ==============================================================================

# Import the modules needed to run the script.
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
try:
    from pyvirtualdisplay import Display
except ImportError:
    str('virtual display not found')

from src.common import constants


class BaseScraper(object):
    """
    Something here class
    """

    browser = None

    def __init__(self, driver=None):
        """

        :param driver: Driver...
        """
        if driver is not None:
            self.driver = driver
        else:
            self.driver = constants.DEFAULT_DRIVER

        if self.driver == "Firefox":
            self.browser = webdriver.Firefox()
        elif self.driver == 'FirefoxHeadless':
            display = Display(visible=0, size=(1024, 768))
            display.start()
            self.browser = webdriver.Firefox()
        elif self.driver == "Chrome":
            options = webdriver.ChromeOptions()
            options.add_argument('--no-sandbox')
            options.add_argument('--user-data-dir')
            self.browser = webdriver.Chrome(chrome_options=options)
        elif self.driver == 'Phantom':
            self.browser = webdriver.PhantomJS(desired_capabilities=DesiredCapabilities.FIREFOX)
            self.browser.set_window_size(1280, 800)

        self.browser.page_source.encode('utf-8')
        self.browser.wait = WebDriverWait(self.browser, constants.DEFAULT_TIMEOUT)

    def quit(self):
        self.browser.quit()

    def __str__(self):
        return "BaseScraper target browser is %s | webdriver is %s" % (self.driver, self.browser)
