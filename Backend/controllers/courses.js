const Course = require("../models/course");

exports.createCourse = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");  
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imagePath: url + "/images/" + req.file.filename
      });
      course.save().then(createdCourse => {
        res.status(201).json({
          message: "Uspešno dodavanje kursa!",
          course: {
            ...createdCourse,
            _id: createdCourse._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno kreiranje kursa"
        });
      }); 
};

exports.updateCourse = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");  
      imagePath = url + "/images/" + req.file.filename
    }
    const course = new Course({
      _id: req.body._id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imagePath: imagePath
    });
    Course.updateOne({ _id: req.params._id }, course).then(result => {
      res.status(200).json({ message: "Uspešno izmenjen kurs!" });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešna izmena kursa!"
      });
    });
};

exports.getCourses = (req, res, next) => {
    const courseQuery = Course.find();
    let fetchedCourses;
    courseQuery
    .then(documents => {
      fetchedCourses = documents;
      return Course.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Uspešno dobavljanje kurseva!",
        courses: fetchedCourses,
        maxCourses: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje kurseva iz baze podataka"
      });
    });
};

exports.getCourse = (req, res, next) => {
    Course.findById(req.params._id).then(course => {
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: 'Kurs nije pronađen!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje kursa iz baze podataka"
      });
    });
};

exports.deleteCourse = (req, res, next) => {
    Course.deleteOne({ _id: req.params._id })
      .then(result => {
        res.status(200).json({ message: "Kurs obrisan!" });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno brisanje kursa"
        });
      });
};