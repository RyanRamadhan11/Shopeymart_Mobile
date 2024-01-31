import { request, gql } from 'graphql-request'

const MASTER_URL = 'https://api-ap-southeast-2.hygraph.com/v2/clryegjp51ggt01tez7399rvr/master' 

const getSlider = async () => {
    const query = gql`
    query getSlider {
        products {
            id
            name
            image {
              url
            }
          }
      }
    `
    const result = await request(MASTER_URL, query)
    return result;
}

export default{
    getSlider
}