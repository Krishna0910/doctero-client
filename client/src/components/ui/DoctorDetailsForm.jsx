import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import { createDoctor } from '../../services/apiDoctor';
import { CityDropdown, StateDropdown } from './StatesAndCities';
import { state_arr } from '../../../CONSTANTS';
import { updateUser } from '../../services/apiAuth';

const inputStyles =
  'bg-stone-50 border-[1px] rounded-md p-2 flex-1 placeholder:text-stone-500 placholder:font-light text-stone-700 text-sm';

let city = null;
let state = null;

function DoctorDetailsForm() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const handleCitySelect = (state) => {
    setSelectedCity(state);
  };

  [city, state] = [selectedCity, selectedState];

  return (
    <div className="flex h-[100bh] w-full items-center justify-center">
      <div className="relative flex h-[88%] w-[64%] flex-col items-center justify-center rounded-lg bg-stone-50 p-[2rem] shadow-lg">
        <div className="absolute left-0 top-0 h-4 w-full rounded-t-md bg-stone-200"></div>

        <div
          className="absolute left-0 top-0 h-4 rounded-r-md rounded-t-md bg-[#146EB4]"
          style={{
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>

        <style>
          {`
            #slider::-webkit-slider-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
            #slider::-moz-range-thumb {
              background-color: transparent; /* Transparent thumb color */
              transition: background-color 0.3s ease-in-out; /* Transition effect */
            }
          `}
        </style>

        <Form method="POST" className="h-full w-full overflow-scroll">
          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Profile details
            </span>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Name</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="What is your name"
                  name="name"
                  required
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Email</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="email"
                  placeholder="What is your email"
                  name="email"
                  // required
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Phone</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="What is your phone number"
                  name="phone"
                  // required
                  className={inputStyles}
                />
              </div>
            </div>
          </div>

          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Personal details
            </span>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Aadhar number</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="What is your aadhar number"
                  name="aadharNumber"
                  // required
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Gender</span>
                </div>
                <input
                  type="text"
                  placeholder="What is your gender"
                  name="gender"
                  className={inputStyles}
                />
              </div>
            </div>
          </div>

          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Location details
            </span>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">Address</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="What is your address"
                  name="address"
                  // required
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">State</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <StateDropdown
                  onSelect={handleStateSelect}
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <div className="relative">
                  <span className="text-stone-700">City</span>
                  <span className="absolute right-[-8px] top-[-5px] text-red-400">
                    *
                  </span>
                </div>
                <CityDropdown
                  onSelect={handleCitySelect}
                  className={inputStyles}
                  stateIndex={
                    state_arr.indexOf(selectedState) === -1
                      ? 0
                      : state_arr.indexOf(selectedState)
                  }
                />
              </div>
            </div>
          </div>

          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Professional details
            </span>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex w-[24rem] items-center space-x-4">
                <span className="text-stone-700">Education</span>
                <input
                  type="text"
                  placeholder="What is your education"
                  name="education"
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <span className="text-stone-700">Experience</span>
                <input
                  type="text"
                  placeholder="What is your experience in years"
                  name="experience"
                  className={inputStyles}
                />
              </div>

              <div className="flex w-[24rem] items-center space-x-4">
                <span className="text-stone-700">Specialisation</span>
                <input
                  type="text"
                  placeholder="What are you good at"
                  name="specialisation"
                  className={inputStyles}
                />
              </div>
            </div>
          </div>

          <div className="relative my-4 mb-8 border-[1px] p-4 py-8">
            <span className="absolute left-2 top-[-12px] bg-stone-50 text-sm text-stone-400">
              Avatar
            </span>

            <div className="flex flex-wrap justify-between">
              <input type="file" name="avatar" className="text-stone-400" />
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <button
              type="submit"
              className="align-center bg-stone-900 px-12 text-stone-50"
            >
              Create clinic
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  var nestedDoctor = { ...data, state, city };

  // If OK create new doctor
  const newDoctor = await createDoctor(nestedDoctor);

  // Set patient to local storage
  // localStorage.setItem('doctor', JSON.stringify(newDoctor));

  if (!newDoctor) {
    return redirect('/form-doctor');
  }

  const oldUser = JSON.parse(localStorage.getItem('user'));

  const updatedUser = await updateUser({
    ...oldUser,
    doctor: newDoctor.data.therapist,
    isOnboard: true,
  });

  localStorage.setItem('user', JSON.stringify(updatedUser));

  return redirect(`${!updatedUser ? '/form-doctor' : '/just-there'}`);
}

export default DoctorDetailsForm;
