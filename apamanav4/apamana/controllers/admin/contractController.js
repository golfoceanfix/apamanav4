const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT contract.id as No,room.name as Rname,apartment.name as Apname,contract.room_price as Rprice,contract.contract_date as Cdate,contract.bail as Bail,contract.min_month as Mmonth,contract.electric_meter as Emeter,contract.water_meter as Wmeter,customer.name as Cname,contract.status as Status,contract.end_date as Edate FROM contract JOIN room ON contract.room_id = room.id JOIN apartment ON contract.apartment_id = apartment.id JOIN customer ON contract.customer_id = customer.id', (err,contract) => {
        if(err){
          res.json(contract);
        }
        //console.log(customers);
        res.render('./admin/contracts', {
          data:contract

        });
      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err,conn) => {
      conn.query('SELECT * from apartment',(err,apartment)=>{
        conn.query('SELECT * FROM room',(err,room) => {
          conn.query('SELECT * FROM customer',(err,customer) => {
          res.render('./admin/contractForm',{
            data1:apartment,data2:room,data3:customer,data4:data
           });
          });
        });
      });
    });
  }
};

controller.save = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data=req.body
    req.getConnection((err,conn) =>{
      conn.query('INSERT INTO contract set ?',[data],(err,contract) =>{
        if(err){
          res.json(err);
        }
        console.log(contract);
        res.redirect('/admin/contract');
      });
    });
  }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM contract WHERE id = ?',[id],(err,contract) => {
        if(err){
          res.json(err);
        }
        console.log(contract);
        res.redirect('/admin/contract');
      });
    });
  }
};

controller.edit = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err,conn) => {
      conn.query('SELECT * FROM apartment',(err,apartment)=>{
        conn.query('SELECT * FROM room',(err,room) => {
         conn.query('SELECT * FROM customer',(err,customer) => {
          conn.query('SELECT * FROM contract WHERE id = ?',[id],(err, contract) => {
            res.render('./admin/contractForm',{
                data1:apartment,data2:room,data3:customer,data4:contract
              });
           });
          });
        });
      });
    });
  }
};

controller.update = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    const data = req.body;
    console.log(data);
    req.getConnection((err, conn) => {
      conn.query('UPDATE contract SET ? WHERE id = ?',[data,id],(err,contract) => {
        if(err){
          res.json(err);
        }
        console.log(contract);
        res.redirect('./admin/contract');
      });
    });
  }
};

module.exports = controller;
