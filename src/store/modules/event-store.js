import { API, graphqlOperation, Storage } from "aws-amplify";
import { getEvent, listEvents } from "@/graphql/queries";
import { createEvent, deleteEvent } from "@/graphql/mutations";

export default {
  state: {
    event: {
      title: "",
      hostName: "",
      hostEmail: "",
      description: "",
      type: "",
      date: "",
      startTime: null,
      endTime: null,
      image: null,
      link: "",
    },
    events: [],
  },
  actions: {
    async addEvent({ commit }, event) {
      try {
        if (event.image) {
          const name = `events/${event.image.name}`;
          const image = await Storage.put(name, event.image);
          event.image = image.key;
        }
        const res = await API.graphql(
          graphqlOperation(createEvent, { input: event })
        );
        commit("SET_EVENT", res.data.createEvent);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Event Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchEvents({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listEvents));

        const events = await Promise.all(
          res.data.listEvents.items.map(async (event) => {
            const image = await Storage.get(event.image);
            event.image = image;
            return event;
          })
        );

        commit("SET_EVENTS", events);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchEvent({ commit }, id) {
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(graphqlOperation(getEvent, { id: id }));

        if (res.data.getEvent.image) {
          const image = await Storage.get(res.data.getEvent.image);
          commit("SET_EVENT", {
            ...res.data.getEvent,
            imageURL: image,
          });
        } else {
          commit("SET_EVENT", {
            ...res.data.getEvent,
            imageURL: null,
          });
        }
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
    async deleteEvent({ commit }, id) {
      try {
        await API.graphql(graphqlOperation(deleteEvent, { input: { id: id } }));
        commit("SET_SNACKBAR", {
          show: true,
          message: "Event Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SET_EVENT: (state, event) => (state.event = event),
    SET_EVENTS: (state, events) => (state.events = events),
  },
  getters: {
    event: (state) => state.event,
    events: (state) => state.events,
  },
};