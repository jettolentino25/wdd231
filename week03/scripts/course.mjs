const byuiCourse = {
  name: "Web Frontend Development I",
  code: "WDD231",
  sections: [
    { sectionNum: 1, enrolled: 88, instructor: "Brother Bingham" },
    { sectionNum: 2, enrolled: 81, instructor: "Sister Shultz" },
    { sectionNum: 3, enrolled: 95, instructor: "Sister Smith" }
  ],

  changeEnrollment(sectionNum, enroll = true) {
    const section = this.sections.find(
      (item) => item.sectionNum === sectionNum
    );

    if (section) {
      section.enrolled = Math.max(0, section.enrolled + (enroll ? 1 : -1));
    }
  }
};

export default byuiCourse;