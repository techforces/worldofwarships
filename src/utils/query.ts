import { gql, type TypedDocumentNode } from "@apollo/client";
import type { VehicleList } from "./queryTypes";

export const GET_WARSHIPS: TypedDocumentNode<VehicleList> = gql`
  query Vehicles($languageCode: String = "ru") {
    vehicles(lang: $languageCode) {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }
`;
