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
      return a.data.order - b.data.order
    });
    return experience
  });
}

export const config = {
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine: 'njk',
};
