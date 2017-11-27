import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import pdb
from time import sleep


class HackappellasTestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.addCleanup(self.driver.quit)

    def testPageTitle(self):
        self.driver.get('http://hackappellas.me')
        self.assertIn('Playlistr', self.driver.title)

    def testForwardBack(self):
        # TODO use .forward .back
        pass

    def testExclude(self):
        self.driver.get(
            'http://hackappellas.me/albums?order_by=popularity&desc=true')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_elements_by_tag_name("input")[1])
        exclude_box.send_keys("american" + Keys.RETURN)
        # TODO: Check american doesn't appear

    def testSearch(self):
        self.driver.get(
            'http://hackappellas.me/')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_tag_name("input"))
        exclude_box.send_keys("american" + Keys.RETURN)
        # TODO: check search results

if __name__ == '__main__':
    unittest.main(verbosity=2)
