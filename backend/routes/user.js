const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  let { lamount, fname, lname, mname, lpurpose, city, zip, statess,   email,hphone, mphone, ssn, sa1, sa2,  rt, rd, dob, status } = req.body;
  console.log(req.body);
  const newuser = new User({
    lamount,
    fname,
    mname,
    lname,
    lpurpose,
    city,
    zip,
    statess,
    email,
    hphone,
    mphone,
    ssn,
    sa1,
    sa2,
    rt,
    dob,
    rd,
    status,
  });
  newuser 
    .save()
    .then(() => res.json(newuser))
    .catch((err) => {
      res.status(400).json(err.message)
    });
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
       res.json("User details deleted.")
      })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.status = req.body.status;
      user
        .save()
        .then(() => { 
          res.json("User details updated!")
          console.log(req.body)
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
