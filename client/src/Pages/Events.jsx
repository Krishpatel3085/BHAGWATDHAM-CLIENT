import React, { useEffect, useState } from "react";
import { APi_URL } from "../Utilis/Api";
import axios from "axios";
import { Card, CardContent } from "../components/ui/Card";
import { motion } from "framer-motion";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

   // Event fetch data
   useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${APi_URL}Event/getEvent`);

        if (response.data.events && response.data.events.length > 0) {
          const today = new Date().toISOString().split("T")[0];

          const upcomingEvents = response.data.events.filter(
            event => event.EventDate.split("T")[0] >= today
          );

          setEvents(upcomingEvents);
          console.log("Upcoming Events:", upcomingEvents);
          
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {/* Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center text-secondary mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>

          {/* Conditional Rendering */}
          {loading
            ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) =>
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden h-[210px] p-6 animate-pulse"
                  >
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
                    <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-4" />
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                  </div>
                )}
              </div>
            : events.length === 0
              ? <p className="text-center text-gray-500 text-lg">
                  No Upcoming Events
                </p>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...events]
                    .sort((a, b) => {
                      const today = new Date().toISOString().split("T")[0];
                      const aDate = a.EventDate.split("T")[0];
                      const bDate = b.EventDate.split("T")[0];

                      if (aDate === today && bDate !== today) return -1;
                      if (bDate === today && aDate !== today) return 1;
                      return new Date(a.EventDate) - new Date(b.EventDate);
                    })
                    .map((event, index) =>
                      <motion.div
                        key={event._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="bg-white shadow-md rounded-lg overflow-hidden h-[210px] flex flex-col">
                          <CardContent className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold text-primary mb-2">
                              {event.EventName}
                            </h3>

                            <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden text-ellipsis">
                              {event.EventDescriptions}
                            </p>

                            <p className="text-sm text-gray-500">
                              📅{" "}
                              {new Date(event.EventDate).toLocaleDateString()} |
                              ⏰ {event.EventTime}
                            </p>

                            <span
                              className={`inline-block mt-3 text-xs px-2 py-1 rounded-full self-start
                            ${event.EventStatus === "Upcoming"
                                ? "bg-yellow-500 text-white"
                                : event.EventStatus === "Today"
                                ? "bg-green-500 text-white"
                                : "bg-gray-400 text-white"}`}
                            >
                              {event.EventStatus}
                            </span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                </div>}
        </div>
      </section>
    </div>
  );
}

export default Events;
