import axios from 'axios';
import React, {Component} from 'react';
import {Card, Table, Image} from 'react-bootstrap';
import moment from 'moment';

export default class FlightCard extends Component {

    state = {
        flights: {
            itineraries: [],
            legs: []
        }
    }

    // async function getUser() {
    //     try {
    //       const response = await axios.get('/user?ID=12345');
    //       console.log(response);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }

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

    findAirlinebyLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg !== "undefined") return leg.airline_id;
    }

    findDepartureTimeByLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg !== "undefined") {
            return moment(leg.departure_time).format('hh:mm a');;
        }   
    }

    findArrivalTimeByLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg !== "undefined") {
            return moment(leg.arrival_time).format('hh:mm a');
        }
    }

    findDepartureAirportByLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg !== "undefined") return leg.departure_airport;
    }

    findArrivalAirportByLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg !== "undefined") return leg.arrival_airport;
    }

    findFlightDurationByLegId(legId){
        const leg = this.findLeg(legId);
        if (typeof leg != "undefined"){
            return moment.utc().startOf('day').add(leg.duration_mins, 'minutes').format('hh[h] mm[m]');
        }
    }

    // findFlightDataByIndexAndLegId(index, legId){
    //     const leg = this.findLeg(legId);
    //     if (typeof leg !== "undefined"){
    //         return leg.index;
    //     } 
    // }

    // would prefer to write a function that finds flight information 
    // by using input paramaters e.g. findFlightInfo(departure_time)

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Table responsive striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>{this.findAirlinebyLegId(this.props.legId)}</td>
                                    <td>{this.findDepartureAirportByLegId(this.props.legId)}</td>
                                    <td></td>
                                    <td>{this.findArrivalAirportByLegId(this.props.legId)}</td>
                                    <td></td>
                                    <td>{this.findFlightDurationByLegId(this.props.legId)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>{this.findDepartureTimeByLegId(this.props.legId)}</td>
                                    <td><Image src="../right-arrow.png"></Image></td>
                                    <td>{this.findArrivalTimeByLegId(this.props.legId)}</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
