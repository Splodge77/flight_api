import axios from 'axios';
import React, {Component} from 'react';
import {Image} from 'react-bootstrap';
import moment from 'moment';
import BpkCard from 'bpk-component-card';

export default class FlightCard extends Component {

    state = {
        flights: {
            itineraries: [],
            legs: []
        },
        currentItinerary: {},
        leg1: {},
        leg2: {}
    }

    componentDidMount() {
        try {
            axios.get('../flights.json')
            .then(result => {
                    const flights = result.data;
                    this.setState({flights});
                });
             } catch (error) {
                 console.log(error);
             }
    };

    findLeg(legId){
        const legs = this.state.flights.legs;
        const leg = legs.find(leg => leg.id === legId);
        return leg;
    }


    findItineraryById(itineraryId){
        const itineraries = this.state.flights.itineraries;
        const itinerary = itineraries.find(itinerary => itinerary.id === itineraryId);
        return itinerary;
    }

    findItinerary(itineraryId){
        const itinerary = this.findItineraryById(itineraryId);
        if (typeof itinerary !== "undefined") this.state.currentItinerary = itinerary;
    }

    findLegsByItinerary(itineraryId){
        const itinerary = this.findItineraryById(itineraryId);
        if (typeof itinerary !== "undefined") {
            this.state.leg1 = this.findLeg(itinerary.legs[0]);
            this.state.leg2 = this.findLeg(itinerary.legs[1]);
        }
    }

    formatTime(leg){
        return moment(leg.arrival_time).format('hh:mm a')
    }

    formatDuration(leg){
        return moment.utc().startOf('day')
        .add(leg.duration_mins, 'minutes').format('hh[h] mm[m]');
    }

    isDirect(leg){
        if (leg.stops === 0){
            return "Direct";
        } else {
            return leg.stops + " stops";
        }
    }

    findPrice(itineraryId){
        const itinerary = this.findItineraryById(itineraryId);
        if (typeof itinerary !== "undefined"){
            return itinerary.price;
        }
    }

    render() {
        return (
            <div>
                {this.findLegsByItinerary(this.props.itinerary)}
                {this.findItinerary(this.props.itinerary)}
                <BpkCard style={{marginBottom: '1em'}}>
                    <table style={{fontSize: '14px', width: '0 auto'}}>
                        <tbody>

                            <tr>
                                <td rowSpan={2}>{this.state.leg1.airline_id}</td>
                                <td>{this.state.leg1.departure_airport}</td>
                                <td></td>
                                <td>{this.state.leg1.arrival_airport}</td>
                                <td></td>
                                <td>{this.formatDuration(this.state.leg1)}</td>
                            </tr>
                            <tr>
                                <td>{this.formatTime(this.state.leg1)}</td>
                                <td><Image src="../right-arrow.png"></Image></td>
                                <td>{this.formatTime(this.state.leg1)}</td>
                                <td></td>
                                <td>{this.isDirect(this.state.leg1)}</td>
                            </tr>

                            <tr>
                                <td rowSpan={2}>{this.state.leg2.airline_id}</td>
                                <td>{this.state.leg2.departure_airport}</td>
                                <td></td>
                                <td>{this.state.leg2.arrival_airport}</td>
                                <td></td>
                                <td>{this.formatDuration(this.state.leg2)}</td>
                            </tr>
                            <tr>
                                <td>{this.formatTime(this.state.leg2)}</td>
                                <td><Image src="../right-arrow.png"></Image></td>
                                <td>{this.formatTime(this.state.leg2)}</td>
                                <td></td>
                                <td>{this.isDirect(this.state.leg2)}</td>
                            </tr>
                            <tr>
                                <td>{this.findPrice(this.props.itinerary)}</td>
                            </tr>

                        </tbody>
                    </table>
                </BpkCard>
            </div>
        )
    }
}
