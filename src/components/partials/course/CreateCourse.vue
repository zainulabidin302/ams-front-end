<template>
  <div class="container">
    <div class="form-container">
      <h1>Course information</h1>
    <form action="" @submit.prevent="handleForm" ref="_course">

      <input type="submit" :value="(update ? 'Update Course': 'Save Course' )" @click="saveCourse()" v-if="!loading['save']" />
      <div v-if="error['save']" v-html="errorMessage['save']"></div>
      <div v-if="success['save']" v-html="successMessage['save']"></div>

      <!-- <input type="submit" value="Delete Course" @click="deleteCourse()" class="delete-btn"> -->
      <div v-if="loading['save']" >
          <img src="./../../../assets/loader.gif" style="width: 90px;height: 50px;">
      </div>
      <div class="field">
        <label>
          Course Title <small>(required)</small>
        </label>
        <input type="text" 
        @keyup="searchShow = true" @keydown="searchShow = true" @blur="onCourseBlur" 
        v-model="course.title" placeholder="Enter a short course title for example 'Anylisis of Algorithm'" >
        <div v-if="searchShow">
        <div v-for="crs in filterdCourses">
          <li style="background: gray; border: 1px solid white;color: white; list-style-type: none; padding: 10px; cursor: pointer;" @click="course.title = crs.courseTitle">{{crs.courseTitle}} (click to select)</li></br>
        </div>
        <div v-if="filterdCourses.length == 0">
          <li style="background: gray; border: 1px solid white;color: white; list-style-type: none; padding: 10px; cursor: pointer;" @click="course.title = '*'">No Match, Click to show All or New Course will be created for your string.</li></br>
        </div>
        </div>
        <hr>
      </div>
      <!-- <div class="field" >
        <label >
          Additinoal Information 
        </label>
        <button  @click="additionalInformation = !additionalInformation" v-if="!additionalInformation">+</button>
        <button @click="additionalInformation = !additionalInformation" v-if="additionalInformation">-</button>
      </div> -->

      <div class="field" v-if="additionalInformation" >
      <label >
        Course Description <small>(optional)</small>
      </label>
      <input type="text" placeholder="Enter a long description of course (optional)" >
      </div>

      <div class="field"  v-if="additionalInformation" >
        <label >
          Course Code
        </label>
        <input type="text" placeholder="Course Code makes it easy to identify the course." >
      </div>

      <div class="field"   >
        <!-- <label >
          Students <small><small>(List of students allowed to upload assignments, it should be in the format : <br>f123123@umt.edu.pk, 0300123123123\n</br> f123123@umt.edu.pk, 0300123123123\n <br> ...)</small></small>
        </label> -->
        
        <input type="hidden"  placeholder="f123123@umt.edu.pk, hello@umt.edu.pk, ...." v-model="course.students">
        <input type="file" @change="readFile">
        <!-- <button @click="studentsCSVCollapsed = !studentsCSVCollapsed" v-if="studentsCSVCollapsed">+ (expand students list) </button> -->
        
      </div>
      <div  class="field" >
        <!-- <button @click="studentsCSVCollapsed = !studentsCSVCollapsed" v-if="!studentsCSVCollapsed">- (collapse)</button> -->
        <hr>
        <div v-if="studentsCSV.length == 0">
          No students are added.
        </div>
        
        <div v-for="(studentEmail, studentIndex) in studentsCSV" >
          <div>
            <button @click="removeStudent(studentIndex)" class="delete-btn">x</button>
            {{ studentIndex + 1 }} {{studentEmail}} 
          </div>
          
        </div>
        <div >
          <input type="text"  placeholder="add student email" v-model="newStudentEmail" />
          <button @click="addNewStudent">+</button>
        </div>
        <hr>
      </div>
      <div class="field" v-if="additionalInformation" >
        <label >
          Email <small>(instructor's email)</small>          
        </label>
        <input type="text" placeholder="allan@k.com" >
      </div>

      <div class="field" v-if="additionalInformation" >
        <label >
          Name <small>(instructor's name) </small>          
        </label>
        <input type="text" placeholder="Allan K" >
      </div>

      <div class="field" v-if="additionalInformation" >
        <label >
          Course email (auto-generated)
        </label>
        <input type="text" readonly="" value="course-email-00123123123@umt.edu.pk" >
      </div>

      <div class="field" v-if="course.assignments.filter(item => item.collapsed === false).length > 0" >
        <button @click="collapseAllAssignments" > - (Collapse All assignments) </button>
      </div>

      <div class="field" v-if="course.assignments.filter(item => item.collapsed === false).length != course.assignments.length" >
        <button @click="expandAllAssignment" > - (Expand All assignments) </button>
      </div>

      <div class="assignment" v-for="(assign, assignmentIndex) in course.assignments">
        
        <div>
          {{assignmentIndex + 1}}. {{assign.title}}
          <button @click="assign.collapsed =  (!assign.collapsed)" v-if="assign.collapsed" title="expand">+</button>
          <button @click="assign.collapsed =  (!assign.collapsed)" v-if="!assign.collapsed" title="collapse">-</button>
          
          <button @click="deleteAssignment(assignmentIndex)" class="delete-btn">x</button>
        </div>
        
        <div v-if="!assign.collapsed" class="collabsable">
          <div class="field">
          <label >
            Assignment Title 
          </label>
          <input type="text" v-model="assign.title">
          </div>

          <div class="field" >
            <label>Additinoal Information </label>
            <div style="font-family: verdana">
          <button  @click="assign.additional_information = !assign.additional_information" v-if="!assign.additional_information">+</button>
          <button @click="assign.additional_information = !assign.additional_information" v-if="assign.additional_information">-</button>
                </div>
          </div>

          <div class="field" v-if="assign.additional_information">
          <label >
            Description 
          </label>
          <input type="text" v-model="assign.description"  >
          </div>

          <div class="field" >
          <label >
            Deadline
            {{assign.deadline}}
          <input checked="true" type="checkbox"><small><small>(allow submission after due date.)</small></small>
          </label>
          <div class="field-group">
          <input type="datetime-local" v-model="assign.deadline" placeholder="DD-MM-YYYY HH:MM AM/PM" >
            
          </div>
          
          </div>

          <div class="field" v-if="assign.additional_information">
          <label >
            Body
          </label>
          <textarea style="width: 30em; " rows="10" v-model="assign.body">
          </textarea>
          </div>

          <div class="field">
          <label>
            Attatchments <small><small>(You can select multiple files)</small></small>
          </label>
            <input type="file" :name="'files[' + assignmentIndex + ']'" multiple="multiple">

          
          </div>
          <div v-if="update">
            
            <div v-for="(att, attIndex) in assign.attatchments_existing" >
              <a :href="domain + '/public/' + att.filename">
                {{att.originalname}} - <small>({{att.size}})</small> {{att.mimetype}}
              </a> 
                <button @click="assign.attatchments_existing.splice(attIndex, 1)" class="delete-btn">x</button>

              </div>
          </div>
        </div>


      </div>
    <div class="field" style="padding: 15px;">
        <label >
        <button @click="addNewAssignment()">+</button>
          Add New Assignment
        </label>
    </div>


    </form>
    </div>
  </div>  
</template>

<script>
import config from '../../../config.js'
function Model() {}
Model.prototype.toJSON = function() {
  let opts = {};
  Object.keys(this).forEach(key => {
    if (this.hasOwnProperty(key)) {
      opts[key] = this[key];
    }
  });
  return opts;
};

const _model = new Model();

function Course(options = {}) {
  // Model.call(this);
  this.title = options.title || null;
  this.description = options.description || null;
  this.course_code = options.course_code || null;
  this.students = options.students || null;
  this.teacher = options.teacher || null;
  this.course_email = options.course_email || null;
  this.assignments = options.assignments || [];
}
Course.prototype = _model;

function Assignment(options = {}) {
  // Model.call(this);
  this._id = options._id || null;
  this.title = options.title || null;
  this.description = options.description || null;
  this.deadline = options.deadline || null;
  this.body = options.body || null;
  this.attatchments_existing = options.attatchments_existing || null;
  this.attatchments = options.attatchments || [];
  this.collapsed = false;
  this.additional_information = false;
}

Assignment.prototype = _model;

export default {
  data() {
    let course = new Course().toJSON();
    return {
      course,
      studentsCSVCollapsed: true,
      newStudentEmail: null,
      searchShow: false,
      additionalInformation: false,
      domain : config.apiServer,
      coursesTitles: [],

      errorMessage: {
        'save': 'Can not save'
      },
      error: {
        'save': false,
      },
      loading: {
        'save': false
      },
      success: {
        'save': false,
      },
      successMessage: {
        'save': '',
      },

      update: false,

    };
  },
  
  created() {
    
    if (this.$route.params.id) {
      let _id = this.$route.params.id
      this.fetchCourse(_id)
      this.update = true
    }

    this.fetchCourses()
  },
  methods: {
    onCourseBlur() {
      
      setTimeout(() => {
        this.searchShow = false;
      },50)
    },
    fetchCourses() {
      fetch(this.domain + "/courses/titles").then(r => r.json()).then(response => {
        this.coursesTitles = response
      }).catch(error => console.log(error))
    },
    fetchCourse(id) {
      fetch(this.domain + "/course/" + id).then(r => r.json()).then(response => {
      if (typeof(response) === 'object' && response instanceof Array && response.length > 0) {
        let course = response[0]

        let assignments = response.map(assign => {
          return new Assignment(options = {
            title: assign.title,
            attatchments_existing: assign.files,
            deadline: assign.deadline,
            _id: assign._id
          }).toJSON()
        })
        let options = {
          title: course.courseTitle,
          students: course.courseStudents.map(item => item.email + "," + item.phone).join('\n'),
          course_email: course.courseEmail,
          assignments: assignments

        }
        this.course = new Course(options).toJSON()
      }
      }).catch(error => console.log(error))
    },
    handleForm() {},
    readFile(event) {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = () => {
        var text = reader.result;
        this.course.students = text;
      };
      if (input.files[0].type == "text/plain") {
        reader.readAsText(input.files[0]);
      } else {
        alert("file must be csv of emails");
      }
    },
    addNewAssignment() {
      this.course.assignments.push(
        new Assignment({ title: "Untitled Assignment" }).toJSON()
      );
    },
    deleteAssignment(id) {
      this.course.assignments.splice(id, 1);
    },
    saveCourse() {
      
      let formData = new FormData();
      this.loading['save'] = true;
      this.error['save'] = false;
      this.success['save'] = false;

      formData.set("course.title", this.course.title);
      this.studentsCSV.map(item => item.split(",")).forEach(studentRecord => {
        formData.append("course.students", studentRecord);
      });
      this.course.assignments.forEach((item, idx) => {
        let fileInput = this.$refs._course.querySelector(
          "input[name='files[" + idx + "]']"
        );
        if (fileInput.files) {
          for (let fileIndex in Object.keys(fileInput.files)) {
            let file = fileInput.files[fileIndex];
            formData.append(`attatchments`, file);
          }
        }
        console.log(item)
        formData.append(
          `assignments`,
          JSON.stringify({
            _id: item._id,
            title: item.title,
            body: item.body,
            deadline: item.deadline,
            attatchments_existing: item.attatchments_existing,
            attatchmentsLength: fileInput.files.length
          })
        );
      });

      
      if (this.update) {
      fetch(this.domain + "/api/course/update", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"
          // "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      })
        .then(response => {
            return response.json()
          })
        .then(data => {
          
          if (data.error) {
            this.loading['save'] = false;
            this.error['save'] = true;
            this.errorMessage['save'] = 'Error: <small style="color:red">' + data.error + "</small>";
          } else {
            this.loading['save'] = false;
            this.success['save'] = true;
            this.successMessage['save'] = 'Success: <small style="color:green">' + data.success + "</small>";
            this.fetchCourse(this.$route.params.id)
          }
          
        }).catch((error) => {
          this.loading['save'] = false;
          this.error['save'] = true;
          this.errorMessage['save'] = 'Err: ' + error.message;
        });
      } else {

      fetch(this.domain + "/api/course", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"
          // "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      })
        .then(response => {
            return response.json()
          })
        .then(data => {
          
          if (data.error) {
            this.loading['save'] = false;
            this.error['save'] = true;
            this.errorMessage['save'] = 'Error: <small style="color:red">' + data.error + "</small>";
          } else {
            this.loading['save'] = false;
            this.success['save'] = true;
            this.successMessage['save'] = 'Success: <small style="color:green">' + data.success + "</small>";
            this.fetchCourses()
          }
          
        }).catch((error) => {
          this.loading['save'] = false;
          this.error['save'] = true;
          this.errorMessage['save'] = 'Err: ' + error.message;
        });
      }

    },
    addNewStudent() {
      if (this.course.students) {
        this.course.students += "," + this.newStudentEmail;
      } else {
        this.course.students = this.newStudentEmail;
      }
      this.newStudentEmail = "";
    },
    deleteCourse() {},
    removeStudent(id) {
      if (
        typeof this.course.students == "string" &&
        this.course.students.length > 0
      ) {
        let students = this.course.students.split(",");
        students.splice(id, 1);
        this.course.students = students.join(",");
      }
    },
    collapseAllAssignments() {
      this.course.assignments.forEach(item => (item.collapsed = true));
    },
    expandAllAssignment() {
      this.course.assignments.forEach(item => (item.collapsed = false));
    }
  },
  computed: {
    studentsCSV() {
      if (
        typeof this.course.students == "string" &&
        this.course.students.length > 0
      ) {
        return this.course.students.split("\n");
      } else {
        return [];
      }
    },
    filterdCourses() {
    
      if (typeof this.course.title === 'string' && this.course.title.length > 0 ) {
        if (this.course.title === '*') {
          return this.coursesTitles
        }
        return this.coursesTitles.filter(course => {
          return course.courseTitle.toLowerCase().search(this.course.title.toLowerCase()) > -1
        })
      } else {
        return []
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-container {
  width: 80%;
  margin: auto;
}
.form-container > form > .field {
  display: block;
  text-align: left;
}
.form-container > form > .field label {
  width: 20em;

  text-align: left;
  display: inline-block;
}
.form-container > form > .field .field-group {
  width: 30em;
  text-align: left;
  display: inline-block;
}

.form-container > form > .field > input[type="text"] {
  width: 30em;
  text-align: left;
  display: inline-block;
}

.assignment {
  width: 40em;
  border-top: 1px solid #999;
  margin: 10px;
  padding: 10px;
  text-align: left;
}
.assignment > .collabsable > .field {
  display: flex;
  justify-content: space-between;
}

.assignment > .collabsable > .field > input {
  flex-basis: 30em;
}
.assignment > .collabsable > .field > .field-group input {
  flex-basis: 40em;
}
.assignment > .collabsable > .field > label {
  flex-basis: 20em;
}
.delete-btn {
  background: #c00000;
  border-radius: 5px;
  color: white;
  font-weight: bolder;
}
</style>
