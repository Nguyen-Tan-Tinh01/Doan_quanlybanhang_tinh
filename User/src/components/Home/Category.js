import categoryAPI from "api/categoryAPI"
import { useEffect, useState } from "react"
import { Card, CardTitle, CardText, Button } from "reactstrap"
export default function Category(props) {
    return (
        <div style={{ display: '-webkit-box', overflowY: "auto" }}>
            {props.data.map((value, index) => {
                return (
                    <Card
                        body
                        className="my-2"
                        style={{
                            width: '12rem'
                        }}
                    >
                        <CardTitle>
                            <img src={value.image} width='150px' />
                        </CardTitle>
                        <CardText style={{textAlign: 'center'}}>
                            {value.name}
                        </CardText>

                    </Card>
                )

            })}
        </div>
    )
}  
