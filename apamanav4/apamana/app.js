//include library
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql');
const connection = require('express-myconnection');
const validator=require('express-validator');

//setting
const app = express();

//midlewares
app.set('view engine','ejs');
app.use(body());
app.use(cookie());
app.use(session({secret:'Passw0rd'}));
app.use(validator());

//connectdatabase
app.use(connection(mysql,{
  host:'localhost',
  user:'root',
  password:'',
  port:3306,
  database:'apamana'
},'single'));

app.use(function(req, res, next) {
   sess=req.session;
   next();
});



//DEFUALT ROUTE
app.get('/admin',function (req,res) {
  if ( typeof req.session.userid == 'undefined') {  res.render('admin/login'); }
  if(req.session.userid>0){ res.render('admin/index'); }
  // res.render('admin/index');
});

app.get('/',function (req,res) {
  if ( typeof req.session.userid == 'undefined') {  res.render('logins'); }
  if(req.session.userid>0){ res.render('filters'); }
  // res.render('admin/index');
});

app.get('/logout',function (req,res) {
  req.session.destroy(function(error){
    res.redirect('/');
  })
});

app.get('/admin/logout',function (req,res) {
  req.session.destroy(function(error){
    res.redirect('/admin');
  })
});

app.post('/',function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM localadmin WHERE username= ? AND password= ?',[username,password],(err,data) =>{
    if(err){
      res.json(err);
    }else {
      if(data.length>0){
        req.session.adminid=data[0].id;
        conn.query('SELECT apartment.name AS Apname, apartment.id,localadmin.username AS username, management.id AS managementid, localadmin.id as local_id FROM management JOIN localadmin ON management.local_id = localadmin.id JOIN apartment ON management.apartment_id = apartment.id WHERE management.local_id = ?',[req.session.adminid],(err,filter) => {
          res.render('filters',{
            data:filter
          });
        });
      }else {
        res.render('logins')
      }
    }
  });
 });
});



app.post('/check/:id',function (req,res) {
  const data = req.params;
  req.getConnection((err,conn) => {
    conn.query('SELECT * FROM management WHERE apartment_id = ? AND local_id = ?',[data.id,req.session.adminid], (err,chk) => {
      if(err){
        res.json(err);
      } else {
        if (chk) {
          req.session.apmid = chk[0].apartment_id;
          console.log(req.session.apmid);
          res.redirect('/index');
        } else {
          res.redirect('filters');

        }
      }
    });
  });
});

app.get('/index', function (req,res) {
  res.render('index');
});

app.post('/admin',function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  req.getConnection((err,conn) =>{
    conn.query('SELECT * FROM user WHERE username= ? AND password= ?',[username,password],(err,data) =>{
    if(err){
      res.json(err);
    }else {
      if(data.length>0){
        req.session.userid=data[0].id;
        res.render('admin/index');
      }else {
        res.render('admin/login')
      }
    }
  });
 });
});





//imports routes
const userRoute = require('./routes/admin/user');
app.use('/', userRoute);

const facilityRoute = require('./routes/admin/facility');
app.use('/', facilityRoute);

const utilityRoute = require('./routes/admin/utility');
app.use('/', utilityRoute);

const furnitureRoute = require('./routes/admin/furniture');
app.use('/', furnitureRoute);

const apartmentRoute = require('./routes/admin/apartment');
app.use('/', apartmentRoute);

const roomRoute = require('./routes/admin/room');
app.use('/', roomRoute);

const listbillRoute = require('./routes/admin/listbill');
app.use('/', listbillRoute);

const roomtypeRoute = require('./routes/admin/roomtype');
app.use('/', roomtypeRoute);

const furnituretypeRoute = require('./routes/admin/furnituretype');
app.use('/', furnituretypeRoute);

const reserveRoute = require('./routes/admin/reserve');
app.use('/', reserveRoute);

const contractRoute = require('./routes/admin/contract');
app.use('/', contractRoute);

const customerRoute = require('./routes/admin/customer');
app.use('/', customerRoute);

const moveinRoute = require('./routes/admin/movein');
app.use('/', moveinRoute);

const checkitemRoute = require('./routes/admin/checkitem');
app.use('/', checkitemRoute);

const repairRoute = require('./routes/admin/repair');
app.use('/', repairRoute);

const repairtypeRoute = require('./routes/admin/repairtype');
app.use('/', repairtypeRoute);

const payRoute = require('./routes/admin/pay');
app.use('/', payRoute);

const noticeRoute = require('./routes/admin/notice');
app.use('/', noticeRoute);

const moveoutRoute = require('./routes/admin/moveout');
app.use('/', moveoutRoute);

const monthlyelectricRoute = require('./routes/admin/monthlyelectric');
app.use('/', monthlyelectricRoute);

const monthlywaterRoute = require('./routes/admin/monthlywater');
app.use('/', monthlywaterRoute);

const localadminRoute = require('./routes/admin/localadmin');
app.use('/', localadminRoute);

const managementRoute = require('./routes/admin/management');
app.use('/', managementRoute);



// route(/)
const user = require('./routes/user');
app.use('/', user);

const facility = require('./routes/facility');
app.use('/', facility);

const utility = require('./routes/utility');
app.use('/', utility);

const furniture = require('./routes/furniture');
app.use('/', furniture);

const apartment = require('./routes/apartment');
app.use('/', apartment);

const room = require('./routes/room');
app.use('/', room);

const listbill = require('./routes/listbill');
app.use('/', listbill);

const roomtype = require('./routes/roomtype');
app.use('/', roomtype);

const furnituretype = require('./routes/furnituretype');
app.use('/', furnituretype);

const reserve = require('./routes/reserve');
app.use('/', reserve);

const contract = require('./routes/contract');
app.use('/', contract);

const customer = require('./routes/customer');
app.use('/', customer);

const movein = require('./routes/movein');
app.use('/', movein);

const checkitem = require('./routes/checkitem');
app.use('/', checkitem);

const repair = require('./routes/repair');
app.use('/', repair);

const repairtype = require('./routes/repairtype');
app.use('/', repairtype);

const pay = require('./routes/pay');
app.use('/', pay);

const notice = require('./routes/notice');
app.use('/', notice);

const moveout = require('./routes/moveout');
app.use('/', moveout);

const monthlyelectric = require('./routes/monthlyelectric');
app.use('/', monthlyelectric);

const monthlywater = require('./routes/monthlywater');
app.use('/', monthlywater);

const listelewa = require('./routes/listelewa');
app.use('/', listelewa);

const wi = require('./routes/wi');
app.use('/', wi);

const wa = require('./routes/wa');
app.use('/', wa);

const bill = require('./routes/bill');
app.use('/', bill);


app.listen('8001');
