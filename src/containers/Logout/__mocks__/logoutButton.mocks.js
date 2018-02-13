import APP_DATA_GUEST_QUERY from '../../../graphql/AppData/queries/guestData.graphql'
import LOGOUT_MUTATION from '../../../graphql/Logout/mutations/logout.graphql'

export default [
  // Application data query
  {
    request: {
      query: APP_DATA_GUEST_QUERY,
    },
    result: {
      data: {
        appData: {
          guest: false,
        },
      },
    },
  },

  // Logout mutation
  {
    request: {
      query: LOGOUT_MUTATION,
    },
    result: {
      data: {
        logout: {
          guest: true,
        },
      },
    },
  },
]
