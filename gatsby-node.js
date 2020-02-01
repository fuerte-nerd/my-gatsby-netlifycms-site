// const path = require(`path`)

// // The image path in markdown files will be 'assets/yourImage.jpg' so create this function to filter it through a regex to get the filename
// const getFilename = url => {
//   return url.match(/(?<=\/).*/g)[0]
// }

// // Here is where we create pages for our blog
// exports.createPages = async ({ actions, graphql, reporter }) => {
//   const { createPage } = actions
  
//   const indexTemplate = path.resolve(`src/templates/indexTemplate.js`)

//   const homepageQuery = await graphql(`
//     {
//       allFile(
//         filter: {
//           sourceInstanceName: { eq: "content" }
//           name: { eq: "homepage" }
//         }
//       ) {
//         edges {
//           node {
//             childMarkdownRemark {
//               frontmatter {
//                 hero_image
//               }
//             }
//           }
//         }
//       }
//     }
//   `)
//   if (homepageQuery.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query.`)
//     return
//   }
//   createPage({
//     path: "/",
//     component: indexTemplate,
//     context: {
//       hero_image: getFilename(
//         homepageQuery.data.allFile.edges[0].node.childMarkdownRemark.frontmatter.hero_image
//       ),
//     },
//   })
// }
