module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");

  return {
    markupTemplatingEngine: "njk",
    templateFormats: ["njk", "html"],
    
    dir: {
      input: ".",         
      output: "_site",     
      includes: "_includes",
      data: "_data"
    }
  };
};