<template>
  <div>
    <div
      :class="{'course': true, 'active': selectedCourse === courseIndex }"
      v-for="(course, courseIndex) in assignmentList"
    >
      <h2>Course: {{course.courseTitle}} - Assignment: {{course.title}}</h2>
      <router-link :to="`/course/${course._id}`">View Details</router-link>
      <br>

      <!-- <b>Course By</b> {{course.instructor.name}} <a :href="'mailto:'+ course.instructor.email">{{course.instructor.email}}</a> -->
      <!-- <br> -->
      <!-- <em>{{course.tags.join(', ')}}</em> -->
      <!-- <br> -->
      <!-- <button @click="selectedCourse = courseIndex" v-if="selectedCourse !== courseIndex">+</button>
      <button @click="selectedCourse = -1" v-if="selectedCourse === courseIndex">-</button>
      <small><em>{{course.assignments.length}}</em> Assignments [1 due]</small>
      <br>
      <small>
        <em>
          {{createdAt(course.createdAt)}}
        </em>
        <em>
          {{updatedAt(course.createdAt, course.updatedAt)}}
        </em>
      </small>-->
      <!-- <div :class="{'assignment': true, 'active': selectedCourse === courseIndex }" v-if="selectedCourse === courseIndex">
        <hr>
        <div v-for="(assign, assignmentIndex) in course.assignments">
          <button @click="selectedAssignment = assignmentIndex" v-if="selectedAssignment !== assignmentIndex">+</button>
          <button @click="selectedAssignment = -1" v-if="selectedAssignment === assignmentIndex">-</button>
          <b>{{assign.title}}</b>
          
          
          <small>
          <em>
            {{createdAt(assign.createdAt)}}
          </em>
          <em>
             {{updatedAt(assign.createdAt, assign.updatedAt)}}
          </em>
          </small>

          <div v-if="assignmentIndex === selectedAssignment">
            <hr>
            <h4>{{assign.description}}</h4>

            <p v-html="html(assign.body)"></p>

            <div v-if="assign.attatchments && assign.attatchments.length > 0"> <h5>Attatchments</h5> </div>
            <div v-for="attatchment in assign.attatchments">
              
              {{attatchment.title}}
              <a :href="attatchment.url"> Download </a>
            </div>

            <hr>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import data from "../../../data/data.js";
import moment from "moment";
import markdown from "markdown";
import config from "../../../config.js";
export default {
  props: ["assignmentList"],
  methods: {
    isSelected(courseIndex) {
      return this.selectedCourse === courseIndex;
    },
    createdAt(a) {
      return "Published: " + moment(new Date(a)).fromNow();
    },
    updatedAt(a, b) {
      if (typeof a === "object" && typeof b === "object") {
        if (a.toString() === b.toString()) {
          return "";
        } else {
          return " | Last Modified: " + moment(new Date(b)).fromNow();
        }
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      selectedCourse: 0,
      selectedAssignment: 0,
      courses: [],
      domain: config.apiServer
    };
  },
  computed: {
    html: () => markdown.markdown.toHTML
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  margin: 0;
  padding: 0;
  line-height: 20 px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.course {
  border: 1px solid black;
  text-align: left;
  padding: 10px;
  margin: 10px;
}

.active.course {
  /* font-size: 1.5em; */
}
.assignment {
}
.active.assignment {
  font-size: 1.5em;
}
</style>
