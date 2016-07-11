'use strict';

import mongoose from 'mongoose';

var OmdbiendpointSchema = new mongoose.Schema({
  details: String,
  //info: String,
  //active: Boolean
});

export default mongoose.model('Omdbiendpoint', OmdbiendpointSchema);
