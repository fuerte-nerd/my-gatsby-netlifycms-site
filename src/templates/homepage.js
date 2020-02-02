import React, { useState } from "react"
import { graphql } from "gatsby"

import BackgroundImage from "gatsby-background-image"

import { Button } from "reactstrap"

import { useSpring, animated } from "react-spring"

import "../components/styles.scss"

export default function Homepage({ data }) {
  const {
    title,
    subtitle,
    button_text,
  } = data.post.edges[0].node.childMarkdownRemark.frontmatter

  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoaded = () => {
    setImageLoaded(true)
  }

  const gradientAnimationProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
  })
  const heroAnimationProps = useSpring({
    from: {
      transform: "translateX(-1000px)",
    },
    to: { transform: "translateX(0px)" },
    delay: 2000,
  })

  return (
    <BackgroundImage
      tag="div"
      fluid={data.image.childImageSharp.fluid}
      backgroundColor="#333333"
      onLoad={handleImageLoaded}
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {imageLoaded ? (
        <div>
          <animated.div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(to bottom left, rgba(255, 255, 255, .1), rgba(255, 255, 255, .8))",
              zIndex: -5,
              ...gradientAnimationProps,
            }}
          />
          <animated.div className="p-5 mb-4" style={heroAnimationProps}>
            <h1 className="display-4">{title}</h1>
            <p className="lead">{subtitle}</p>
            <Button href="#" color="primary" size="lg">
              {button_text}
            </Button>
          </animated.div>
        </div>
      ) : null}
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
        fluid(
          maxWidth: 2500
          duotone: { highlight: "#fafafa", shadow: "#111111" }
          toFormat: PNG
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
