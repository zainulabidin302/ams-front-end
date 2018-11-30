<template>
  <div class="container">
    <h1>Assignments List</h1>
    <router-link to="/course">Create a new Assignment</router-link>
    <div class="search-box">
      <input type="text" v-model="search" placeholder="Enter your search term">
      <course-list :assignmentList="filteredAssignments"></course-list>
    </div>
  </div>
</template>
<script>
import CourseList from "../partials/course/CourseList";
import config from "../../config.js";
export default {
  components: { CourseList },
  created() {
    this.fetchCourses();
  },
  data() {
    return {
      search: "",
      searchShow: false,
      domain: config.apiServer,
      courses: []
    };
  },
  methods: {
    fetchCourses() {
      fetch(this.domain + "/courses")
        .then(r => r.json())
        .then(response => {
          console.log("response");
          this.courses = response;
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    filteredAssignments() {
      if (typeof this.search === "string" && this.search.length > 0) {
        if (this.search === "*") {
          return this.courses;
        }
        return this.courses.filter(course => {
          return (
            course.courseTitle.toLowerCase().search(this.search.toLowerCase()) >
            -1
          );
        });
      } else {
        return this.courses;
      }
    }
  }
};
</script>
<style scoped>
.search-box {
  width: 100%;
  height: 60px;

  padding: 10px;
}
.search-box > input {
  height: 100%;
  width: 100%;
  font-size: 40px;
}
</style>


