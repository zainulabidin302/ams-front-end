<template>
  <div class="container">
    <h1>Hello</h1>
    <router-link to="/course"> Create a new Course</router-link>
    <div class="search-box" >
      <input type="text" placeholder="Enter your search term" />
    </div>
    <course-list></course-list>
  </div>
</template>
<script>
import CourseList from "../partials/course/CourseList";
export default {
  components: { CourseList }
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


