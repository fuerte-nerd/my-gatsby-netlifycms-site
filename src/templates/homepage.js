import React from "react"
import { graphql } from "gatsby"

import BackgroundImage from "gatsby-background-image"

import { Container, Button } from "reactstrap"

import "../components/styles.scss"

export default function homepage({ data }) {
  const {
    title,
    subtitle,
    button_text,
  } = data.post.edges[0].node.childMarkdownRemark.frontmatter

  return (
    <BackgroundImage
      tag="div"
      fluid={data.image.childImageSharp.fluid}
      backgroundColor="#333333"
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
        display: 'flex',
        alignItems: 'flex-end'
      }}
    >
        <div className="animated fadeIn delay-1s" style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: `linear-gradient(to bottom left, rgba(255, 255, 255, .1), rgba(255, 255, 255, .8)`,
          zIndex: -5,
          overflow: 'hidden'
        }}/>
      <div className="p-5 mb-4 animated fadeInLeftBig delay-2s ">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{subtitle}</p>
        <Button href="#" color="primary" size="lg">{button_text}</Button>
      </div>
    </BackgroundImage>
  )
}

export const query = graphql`
  query($hero_image: String!) {
    post: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        name: { eq: "homepage" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              subtitle
              button_text
            }
          }
        }
      }
    }
    image: file(relativePath: { eq: $hero_image }) {
      childImageSharp {
        fluid(maxWidth: 2500, duotone: { highlight: "#fafafa", shadow: "#111111" }, toFormat: PNG) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
