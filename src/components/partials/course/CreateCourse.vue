<template>
  <div class="container">
    <div class="form-container">
      <h1>Course information</h1>
    <form action="" @submit.prevent="handleForm" ref="_course">
      <input type="submit" value="Save Course" @click="saveCourse()">
      <input type="submit" value="Delete Course" @click="deleteCourse()" class="delete-btn">

      <div class="field">
        <label>
          Course Title <small>(required)</small>
        </label>
        <input type="text" v-model="course.title" placeholder="Enter a short course title for example 'Anylisis of Algorithm'" >
      </div>
      <div class="field" >
        <label >
          Additinoal Information 
        </label>
        <button  @click="additionalInformation = !additionalInformation" v-if="!additionalInformation">+</button>
        <button @click="additionalInformation = !additionalInformation" v-if="additionalInformation">-</button>
      </div>

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

      <div class="field"  v-if="additionalInformation" >
        <label >
          Students <small><small>(List of students allowed to upload assignments)</small></small>
        </label>
        
        <input type="text" placeholder="f123123@umt.edu.pk, hello@umt.edu.pk, ...." v-model="course.students">
        <input type="file" @change="readFile">
        <button @click="studentsCSVCollapsed = !studentsCSVCollapsed" v-if="studentsCSVCollapsed">+ (expand students list) </button>
        
      </div>
      <div v-if="!studentsCSVCollapsed" class="field" >
        <button @click="studentsCSVCollapsed = !studentsCSVCollapsed" v-if="!studentsCSVCollapsed">- (collapse)</button>
        <hr>
        <div v-if="studentsCSV.length == 0">
          No students are added.
        </div>
        
        <div v-for="(studentEmail, studentIndex) in studentsCSV" >
          <div>
            <button @click="removeStudent(studentIndex)" class="delete-btn">x</button>
            {{ studentIndex + 1 }}. {{studentEmail}} 
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
  this.title = options.title || null;
  this.description = options.description || null;
  this.deadline = options.deadline || null;
  this.body = options.body || null;
  this.attatchments = options.attatchments || null;
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

      additionalInformation: false
    };
  },
  methods: {
    handleForm() {},
    readFile(event) {
      var input = event.target;

      var reader = new FileReader();
      reader.onload = () => {
        var text = reader.result;
        this.course.students = text;
      };
      if (input.files[0].type == "text/csv") {
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
      formData.set("title", this.course.title);

      this.course.assignments.forEach((item, idx) => {
        let fileInput = this.$refs._course.querySelector(
          "input[name='files[" + idx + "]']"
        );
        // console.log(fileInput.files);

        for (let fileIndex in Object.keys(fileInput.files)) {
          let file = fileInput.files[fileIndex];
          // console.log("index", fileIndex, "file", file);
          formData.set(`assignment[${idx}][attatchment][${fileIndex}]`, file);
        }
      });

      let domain = "http://d7aebb36.ngrok.io";

      fetch(domain + "/api/course", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data"
          // "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
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
        return this.course.students.split(",");
      } else {
        return [];
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
