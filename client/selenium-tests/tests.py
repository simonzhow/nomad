import time
import pymongo
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# delete in mongo table at beginning
client = MongoClient()
db = client.nomad
db.users.remove({})
db.travelentries.remove({})

testUserEmail = 'lwjatbwghp_1513292155@tfbnw.net'
testUserPw = 'Nomad12345'
testUserAddress = '736 Levering Ave'
testUserEntryLocation = 'ucla'
testUserEntryTitle = 'Failed Finals'
testUserEntryDescription = 'Not going to graduate'


driver = webdriver.Chrome('/Users/simonzhou/Documents/chromedriver') # Optional argument, if not specified will search path.
driver.get('localhost:8000/');

######################## LOGIN FLOW #######################

# storing original window
window_before = driver.window_handles[0]

# debug
# print driver.current_window_handle

driver.find_element_by_xpath("//div[text()='Log In']").click()

# storing new window
window_after = driver.window_handles[1]

# switch to new window
driver.switch_to_window(window_after)

# login authentication
elem = driver.find_element_by_id("email")
elem.send_keys(testUserEmail)
elem = driver.find_element_by_id("pass")
elem.send_keys(testUserPw)
elem.send_keys(Keys.RETURN)

try:
    # click continue
    driver.find_element_by_xpath("//button[text()='Continue as Lisa']").click()
except:
    driver.switch_to_window(window_before)

# debug
# print driver.current_window_handle

try:
    time.sleep(2) # shit is loading too fast
    search_input = driver.find_element_by_xpath("//input")
    search_input.send_keys(testUserAddress)
    time.sleep(2)
    search_input.send_keys(Keys.DOWN)
    search_input.send_keys(Keys.ENTER)
except:
    print "already a user"

######################## TRAVEL ENTRIES #######################

time.sleep(1)
driver.find_element_by_xpath("//div[text()='+']").click()

location = driver.find_element_by_xpath("//input[@placeholder='Search for a location...']")
location.send_keys(testUserEntryLocation)
time.sleep(2)
location.send_keys(Keys.DOWN)
location.send_keys(Keys.ENTER)

title = driver.find_element_by_xpath("//input[@placeholder='Hiked Mt. Everest']")
title.send_keys(testUserEntryTitle)

desc = driver.find_element_by_xpath("//textarea[@placeholder='It only took me 3 hours!']")
desc.send_keys(testUserEntryDescription)

driver.find_element_by_xpath("//div[text()='Submit']").click()

# # find map marker
# driver.find_element_by_class_name('map-marker-wrapper').click()

######################## Leaderboard #######################
time.sleep(2)
driver.find_element_by_xpath("//a[text()='Leaderboard']").click()

######################## Find Experiences #######################
time.sleep(2)
nav_leaderboard = driver.find_element_by_xpath("//a[text()='Find Experiences']").click()

######################## My Friends #######################
time.sleep(2)
nav_leaderboard = driver.find_element_by_xpath("//a[text()='My Friends']").click()

# print client
# db = client.nomad
# db.users.remove({first_name: "Lisa"})


print "successful!"
