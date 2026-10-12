import YAML from "yaml"

export default function(eleventyConfig) {
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.setOutputDirectory('dist');
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/assets/stylesheets');

  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));
  eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");

  eleventyConfig.addCollection("experienceSorted", function(collectionsApi) {
    let experience = collectionsApi.getAll().filter(function(item) {
      return item.data.order != null
    }).sort((a, b) => {
      console.log(a.data.order, a.data.title, b.data.order, b.data.title)
      return a.data.order - b.data.order
    });
    console.log(experience)
    return experience
  });
}

export const config = {
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
};
