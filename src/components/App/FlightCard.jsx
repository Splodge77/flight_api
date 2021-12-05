import axios from 'axios';
import React, {Component} from 'react';
import {Card, Table, Image} from 'react-bootstrap';
import moment from 'moment';

export default class FlightCard extends Component {

    state = {
        flights: {
            itineraries: [],
            legs: []
        },
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
        return moment.utc().startOf('day').add(leg.duration_mins, 'minutes').format('hh[h] mm[m]');
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Table responsive striped bordered hover>
                            {this.findLegsByItinerary(this.props.itinerary)}
                            {console.log(this.state.leg1)}
                            <tbody>
                                <tr>
                                    <td>{this.state.leg1.airline_id}</td>
                                    <td>{this.state.leg1.departure_airport}</td>
                                    <td></td>
                                    <td>{this.state.leg1.arrival_airport}</td>
                                    <td></td>
                                    <td>{this.formatDuration(this.state.leg1)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>{this.formatTime(this.state.leg1)}</td>
                                    <td><Image src="../right-arrow.png"></Image></td>
                                    <td>{this.formatTime(this.state.leg1)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
