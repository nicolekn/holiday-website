# A python file with the Flask framework which will render HTML pages and collect and store data submitted
# by the customers of the website.
# Created by Christina Chui and Nicole Nieves
from flask import Flask, render_template, request
from datetime import datetime
import csv

app = Flask(__name__)

# All the HTML pages are rendered using the Flask framework
@app.route('/')
def home(): 
    return render_template('index.html')

@app.route('/information')
def information(): 
    return render_template('information.html')

@app.route('/things_to_do')
def thingstodo(): 
    return render_template('thingstodo.html')

@app.route('/directions')
def directions(): 
    return render_template('directions.html')

@app.route('/contactus')
def contactus(): 
    return render_template('contactus.html')

### ========= Reviews Page ========= ###
@app.route('/reviews')
def reviews():
    reviewsFile='static/comments.csv'
    reviewsList=readFile(reviewsFile)
    return render_template('reviews.html',reviewsList=reviewsList)

@app.route('/addReview', methods = ['POST'])
def addReview():
    reviewsFile = 'static/comments.csv'
    reviewsList=readFile(reviewsFile)
    
    now = datetime.now()
    # dd-mm-yyyy hh:mm time format
    format = "%d-%m-%Y %H:%M%p"
    now = now.strftime(format)
    
    posterName=request.form[('Name')]+' ('+now+')'
    # If no name is entered make the name be 'Anon'
    if (request.form[('Name')] == ''):
    	posterName='Name: Anon'
    
    review=request.form[('Review')]
    newEntry=[posterName,review]
    # If there is no review text do not add the review
    if (request.form[('Review')] == ''):
    	pass
    else:
    	reviewsList.append(newEntry)
    
    writeFile(reviewsList,reviewsFile)
    return render_template('reviews.html',reviewsList=reviewsList)

def readFile(reviewsFile):
    with open(reviewsFile,'r') as inFile:
        reader=csv.reader(inFile)
        reviewsList=[row for row in reader]
    return reviewsList 

def writeFile(reviewsList, reviewsFile):
    with open(reviewsFile, 'w', newline='') as outFile:
        writer = csv.writer(outFile)
        writer.writerows(reviewsList)
    return

### ========= Booking Page ========= ###
@app.route('/booking')
def booking():
	bookingFile = 'static/booking.csv'
	bookingTable= readFile(bookingFile)
	return render_template('booking.html', bookingTable = bookingTable)

@app.route('/displayBook', methods = ['GET'])
def displayBook():
	bookingFile = 'static/booking.csv'
	bookingTable= readBookingFile(bookingFile)

@app.route('/addBookEntry', methods = ['POST'])
def addBookEntry():
	bookingFile = 'static/booking.csv'
	bookingTable= readFile(bookingFile)
	
	contactName = request.form[('name')]
	email = request.form[('email')]
	checkIn = request.form[('checkIn')]
	checkOut = request.form[('checkOut')]
	people = request.form[('people')]
    # Initialize confirmed to 'No' when the booking is submitted
	confirmed='No';
	newBookEntry= [contactName, email, checkIn, checkOut, people, confirmed]
    
    # Check if any of the fields are blank
	if ((contactName=='') or (email=='') or (checkIn=='') or (checkOut=='')):
		pass
	else:
		bookingTable.append(newBookEntry)
	writeFile(bookingTable, bookingFile)
	return render_template('booking.html', bookingTable = bookingTable)

def readBookFile(bookingFile):
	with open(bookingFile, 'r') as inFile:
		reader = csv.reader(inFile)
		bookingTable = [row for row in reader]
	return bookingTable

def writeBookFile(bookingTable, bookingFile):
	with open(bookingFile, 'w', newline='') as outFile:
		writer = csv.writer(outFile)
		print(bookingTable)
		writer.writerows(bookingTable)
	return

# Re-launches the Flask web server when changes have been made to the file
if __name__ == "__main__":
	app.run(debug = True)