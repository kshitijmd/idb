import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException
from time import sleep


class HackappellasTestCase(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.addCleanup(self.driver.quit)

    def testPageTitle(self):
        self.driver.get('http://hackappellas.me')
        self.assertIn('Playlistr', self.driver.title)

    def testPagination(self):
        # /artists?order_by=popularity&desc=true&page=2
        page_1_href = "[href$=page\=1]"
        page_2_href = "[href$=page\=2]"
        self.driver.get(
            "http://hackappellas.me/artists?order_by=popularity&desc=true&page=1")

        # ensure page 1 is selected and page 2 is not
        page_2 = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_css_selector(page_2_href))
        self.assertTrue(page_2)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_css_selector, page_1_href)

        # now ensure page 2 is selected and page 1 is not
        page_2.click()
        page_1 = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_css_selector(page_1_href))
        self.assertTrue(page_1)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_css_selector, page_2_href)

    def testForwardBack(self):
        page_1_href = "[href$=page\=1]"
        page_2_href = "[href$=page\=2]"
        self.driver.get(
            "http://hackappellas.me/artists?order_by=popularity&desc=true&page=1")
        page_2 = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_css_selector(page_2_href))
        page_2.click()

        # self.driver.execute_script("window.history.go(-1)")
        sleep(1)
        self.driver.back()

        page_2 = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_css_selector(page_2_href))
        self.assertTrue(page_2)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_css_selector, page_1_href)

        self.driver.forward()

        page_1 = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_css_selector(page_1_href))
        self.assertTrue(page_1)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_css_selector, page_2_href)

    def testExclude(self):
        # album with 'american' in the title
        album_href = "//a[@href='/albums/113']"

        self.driver.get(
            'http://hackappellas.me/albums?order_by=popularity&desc=true')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_elements_by_tag_name("input")[1])

        # ensure album is present first
        album = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_xpath(album_href))
        self.assertTrue(album)

        # now exclude and test
        exclude_box.send_keys("american" + Keys.RETURN)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_xpath, album_href)

    def testExcludePartialMatch(self):
        # album with 'american' in the title
        album_href = "//a[@href='/albums/113']"

        self.driver.get(
            'http://hackappellas.me/albums?order_by=popularity&desc=true')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_elements_by_tag_name("input")[1])

        # ensure album is present first
        album = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_xpath(album_href))
        self.assertTrue(album)

        # now exclude and test
        exclude_box.send_keys("americ" + Keys.RETURN)
        self.assertRaises(NoSuchElementException,
                          self.driver.find_element_by_xpath, album_href)

    def testSearchForAlbum(self):
        album_href = "//a[@href='/albums/113']"
        self.driver.get(
            'http://hackappellas.me/')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_tag_name("input"))
        exclude_box.send_keys("american" + Keys.RETURN)
        album = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_xpath(album_href))
        self.assertTrue(album)

    def testSearchForArtist(self):
        artist_href = "//a[@href='/artists/124']"
        self.driver.get(
            'http://hackappellas.me/')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_tag_name("input"))
        exclude_box.send_keys("sheeran" + Keys.RETURN)
        artist = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_xpath(artist_href))
        self.assertTrue(artist)

    def testSearchForArtistPartialMatch(self):
        artist_href = "//a[@href='/artists/124']"
        self.driver.get(
            'http://hackappellas.me/')
        exclude_box = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_tag_name("input"))
        exclude_box.send_keys("sheer" + Keys.RETURN)
        artist = WebDriverWait(self.driver, 5).until(
            lambda x: x.find_element_by_xpath(artist_href))
        self.assertTrue(artist)


if __name__ == '__main__':
    unittest.main(verbosity=2)
