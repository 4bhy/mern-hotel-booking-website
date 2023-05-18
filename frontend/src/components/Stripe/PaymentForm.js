import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axiosConfig from '../../config/axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#0497c9",
            color: "#333",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" },
        },
        invalid: {
            iconColor: "#FF0000",
            color: "#FF0000",
        },
    },
};


const PaymentForm = ({ state, discountPrice, couponId }) => {

    const stripe = useStripe()
    const elements = useElements()
    const userInfo = state.userInfo;
    const propertyData = state.propertyData;
    const checkIn = state.checkIn;
    const checkOut = state.checkOut;
    const guests = state.guests;
    const totalPrice = state.totalPrice;
    const discount = discountPrice

    const handleSubmit = async (e) => {
        // setRedirector(false)
        // setOpens(true)
        // e.preventDefault()
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: "card",
        //     card: elements.getElement(CardElement)
        // })
        // if (error != null) {
        //     console.log(error, "yuuu");
        // }
   
                // const { id } = paymentMethod
              const {data}=  await axiosConfig.post("/users/payment", {
                    amount: discount,
                    userInfo,
                    propertyData,
                    checkIn,
                    checkOut,
                    guests,
                    couponId
                })

                // if (response.data.success) {
                //     console.log("Successful payment")
                //     setOpens(false);
                //     setOpen(true);
                //     setRedirector(true)
                // }
        
    }

    const [open, setOpen] = React.useState(false);
    const [opens, setOpens] = React.useState(false);
    const [redirector, setRedirector] = useState(false)
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            
                <fieldset className="FormGroup">
                    <div className="flex items-center justify-center">
                        <button onClick={handleSubmit} type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
                            Pay with Debit Card
                        </button>
                    </div>
                </fieldset>
          

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogContent>
                    <DialogTitle>
                        <Alert severity="success">Payment Successful!</Alert>
                    </DialogTitle>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your reservation won’t be confirmed until the host accepts your request (within 24 hours).
                        You won’t be charged until then.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Link to="/"><Button>HOME</Button></Link>
                </DialogActions>
            </Dialog>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={opens}
                onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}

export default PaymentForm