import * as Yup from 'yup';
import { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Text
} from "@chakra-ui/react";
import "./Reservations.scss";
import { useNavigate } from "react-router-dom";
import Pages from '../utils/Pages';
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

function Reservations() {
  const navigate = useNavigate();

  const { response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      date: '',
      time: '0700',
      guests: '1',
      occasion: 'Birthday',
      name: '',
      email: '',
      telephone: '',
      requests: '',
      creditCardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    onSubmit: (values) => { submit('https://littleLemon.com', values) },
    validationSchema: Yup.object({
      date: Yup.date().required('Date required'),
      name: Yup.string().required('Name required'),
      email: Yup.string().email('Invalid email').required('Valid email required'),
      telephone: Yup.string().required('Required'),
      creditCardNumber: Yup.string().min(16, 'Must be 16 characters').required('Credit card number required'),
      expiryDate: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{4}$/, 'Expiry date must be in mm/yyyy format').required('Expiry date required'),
      cvv: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
    })
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === 'success') {
        navigate(Pages.get("home").path);
        formik.resetForm();

      }
    }
  }, [response, formik, onOpen, navigate]);

  function generateTimeSlots() {
    const timeSlots = [];

    for (let hour = 7; hour <= 23; hour++) {
      const formattedHour = String(hour).padStart(2, '0');

      timeSlots.push(`${formattedHour}00`);
      timeSlots.push(`${formattedHour}30`);
    }

    return timeSlots;
  }

  const availableTimes = generateTimeSlots();

  const minGuest = 1;
  const maxGuest = 10;
  const numberGuests = Array.from({ length: maxGuest - minGuest + 1 }, (_, i) => minGuest + i);

  return (
    <VStack alignItems="center">
      <Heading as="h1" id="reservation" fontFamily={"Markazi Text"}>
        Reservation
      </Heading>

      <Box p={6} rounded="md" w={["90%", "80%", "60%"]} maxW="1024px" >
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!formik.errors.date && formik.touched.date}>
              <FormLabel htmlFor="date">Date</FormLabel>
              <Input
                id="date"
                name="date"
                type="date"
                {...formik.getFieldProps('date')}
              />
              <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="time">Time</FormLabel>
              <Select id="time" name="time" {...formik.getFieldProps("time")}>
                {availableTimes.map(time =>
                  <option key={time}>
                    {time}
                  </option>
                )}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="guests">Guests</FormLabel>
              <Select id="guests" name="guests" {...formik.getFieldProps("guests")}>
                {numberGuests.map(guest =>
                  <option key={guest}>
                    {guest}
                  </option>
                )}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="occasion">Occasion</FormLabel>
              <Select id="occasion" name="occasion" {...formik.getFieldProps("occasion")}>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="name"
                placeholder="Enter full name"
                {...formik.getFieldProps('name')}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps('email')}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.telephone && formik.touched.telephone}>
              <FormLabel htmlFor="telephone">Telephone</FormLabel>
              <Input
                id="telephone"
                name="telephone"
                type="telephone"
                placeholder="Enter telephone"
                {...formik.getFieldProps('telephone')}
              />
              <FormErrorMessage>{formik.errors.telephone}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="requests">Special Requests (Optional)</FormLabel>
              <Textarea
                id="requests"
                name="requests"
                height={250}
                placeholder="Enter any special requests"
                {...formik.getFieldProps("requests")}
              />
            </FormControl>
            <div>
              <Text color="#495e57">To secure your reservation, a credit card is required.
                Please be assured that all credit card information will be processed securely and in accordance with industry-standard protocol.
                Kindly note that cancellations or no-shows made less than 48 hours prior to your reservation will incur a fee of $25 per pax.</Text>
            </div>

            <FormControl isInvalid={!!formik.errors.creditCardNumber && formik.touched.creditCardNumber}>
              <FormLabel htmlFor="creditCardNumber">Credit Card Number</FormLabel>
              <Input
                id="creditCardNumber"
                name="creditCardNumber"
                type="creditCardNumber"
                placeholder="Enter credit card number"
                {...formik.getFieldProps('creditCardNumber')}
              />
              <FormErrorMessage>{formik.errors.creditCardNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.expiryDate && formik.touched.expiryDate}>
              <FormLabel htmlFor="expiryDate">Expiry Date</FormLabel>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="expiryDate"
                placeholder="mm/yyyy"
                {...formik.getFieldProps('expiryDate')}
              />
              <FormErrorMessage>{formik.errors.expiryDate}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.cvv && formik.touched.cvv}>
              <FormLabel htmlFor="cvv">CVV</FormLabel>
              <Input
                id="cvv"
                name="cvv"
                type="cvv"
                placeholder="Enter CVV"
                {...formik.getFieldProps('cvv')}
              />
              <FormErrorMessage>{formik.errors.cvv}</FormErrorMessage>
            </FormControl>

            <Button type="submit" width="full" border="0.1875rem solid #f4ce14" backgroundColor="#f4ce14" color="#495e57" _hover={{
               backgroundColor: '#495e57',
               color: '#f4ce14'
               }}>
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack >
  );
}

export default Reservations;