const controller = {};

controller.list = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    req.getConnection((err,conn) => {
      conn.query('SELECT customer.id as No,customer.id_card as Idcard,customer.name as Cname,customer.address as Address,customer.phone as Phone,customer.position as Position,customer.organize as Organize,apartment.name as Apname FROM customer JOIN apartment ON customer.apartment_id = apartment.id', (err,customer) => {
        if(err){
          res.json(customer);
        }
        //console.log(customers);
        res.render('./admin/customers', {
          data:customer

        });
      });
    });
  }
};

controller.new = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const data = null;
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM apartment',(err, apartment)=>{
        conn.query('SELECT * FROM customer',(err, customer)=>{
        res.render('./admin/customerForm',{
          data1:apartment,data2:data
        });
       });
      });
    });
  }
};

controller.save = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const data = req.body;
      console.log(data);
      req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?',[data],(err,customer) => {
          if(err){
            res.json(err);
          }
          console.log(customer);
          res.redirect('/admin/customer');
        });
      });
    }
};

controller.delete = (req,res) => {
  if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
    const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('DELETE FROM customer WHERE id = ?',[id],(err,customer) => {
        if(err){
          res.json(err);
        }
        console.log(customer);
        res.redirect('/admin/customer');
      });
    });
  }
};

controller.edit = (req,res) => {
    if(typeof req.session.userid == 'undefined') { res.render('./admin/login'); }else {
      const {id} = req.params;
      req.getConnection((err,conn) => {
        conn.query('SELECT * FROM apartment',(err, apartment)=>{
          conn.query('SELECT * FROM customer WHERE id = ?',[id],(err, customer) => {
            res.render('./admin/customerForm',{
            data1:apartment,data2:customer
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
      req.getConnection((err, conn) => {
        conn.query('UPDATE furnituretype SET ? WHERE id = ?',[data,id],(err,furnituretype) => {
          if(err){
            res.json(err);
          }
          console.log(furnituretype);
          res.redirect('/admin/furnituretype');
        });
      });
    }
};

module.exports = controller;
