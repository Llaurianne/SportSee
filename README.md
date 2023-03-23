![Badge Made with](https://img.shields.io/static/v1?label=MADE%20WITH&message=React&color=5ed2f2&style=for-the-badge&logo=react&logoColor=white)
![Badge Uses](https://img.shields.io/static/v1?label=Uses&message=JavaScript&color=F7DF1E&style=for-the-badge&logo=javascript&logoColor=white)
![Badge Uses](https://img.shields.io/static/v1?label=Uses&message=CSS3&color=1572B6&style=for-the-badge&logo=css3&logoColor=white)
![Badge Library](https://img.shields.io/static/v1?label=Library&message=d3&color=F9A03C&style=for-the-badge&logo=d3.js&logoColor=white)

# ![Logo de SportSee](./sportsee_front/src/assets/sportsee_logo.svg)

---
SportSee is a startup dedicated to sports coaching. The web page is a sports analytics dashboard allowing users to consult their profile and view their training data. 
## How to run the app locally

---
### Step 1 - Clone the project
```bash
$ git clone https://github.com/Llaurianne/SportSee.git
```

### Step 2 - Install the dependencies and run the backend API
From the backend directory sportsee_back, with npm :
```bash
$ cd sportsee_back
$ npm i
$ npm run dev
```
Or with yarn
```bash
$ cd sportsee_back
$ yarn
$ yarn dev
```

### Step 3 - Install the dependencies and run the frontend app
From the frontend directory sportsee_front, with npm :
```bash
$ cd sportsee_front
$ npm i
$ npm start
```
Or with yarn
```bash
$ cd sportsee_front
$ yarn
$ yarn start
```
🟢 The page will open automatically and reload when you make changes.  
🟠 You may also see any lint errors in the console.

## Endpoints

---

### Backend
This project includes four endpoints that you will be able to use :

`http://localhost:3000/user/${userId}`  
Retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.).  

`http://localhost:3000/user/${userId}/activity`  
Retrieves a user's activity day by day with kilograms and calories.

`http://localhost:3000/user/${userId}/average-sessions`  
Retrieves the average sessions of a user per day. The week starts on Monday.  

`http://localhost:3000/user/${userId}/performance`  
Retrieves a user's performance (energy, endurance, etc.).


**Warning, currently only two users have been mocked. They have userId 12 and 18 respectively.**

### Frontend
This project includes two endpoints that you will be able to use :

`http://localhost:3001` - Home page.  
This first endpoint displays the list of users. The links allow access to each profile.  

`http://localhost:3001/user/${userId}` - Dashboard.  
This endpoint displays the user's dashboard with his first name.  His/her data is displayed in the form of cards and charts.


**Warning, currently only two users have been mocked. They have userId 12 and 18 respectively.**