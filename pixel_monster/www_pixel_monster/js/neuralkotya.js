
function NeuralKotya(input_size, hidden_size, output_size) {
  if ('function' !== typeof mat) throw new Error('NeuralKotya needs module "mat.js" to be included');

  // converts arguments into proper types
  input_size = ~~input_size;
  output_size = ~~output_size;
  hidden_size = hidden_size instanceof Array ? hidden_size.map(e => ~~e) : [~~hidden_size];

  // checks for some error in arguments
  if (input_size < 1) throw new Error(`First argument (input_size: ${input_size}) must be greater than 0`);
  if (output_size < 1) throw new Error(`Third argument (output_size: ${output_size}) must be greater than 0`);
  if (hidden_size.find(e => e < 1) != null) throw new Error(`Each value of 2nd argument (hidden_size: ${hidden_size}) must be greater than 0`);

  // initilizes weights with random numbers
  let weignts_ih = mat(hidden_size[0], input_size).rand();
  let weignts_ho = mat(output_size, hidden_size[0]).rand();
  let biases_h = mat(hidden_size[0], 1).rand();
  let biases_o = mat(output_size, 1).rand();


  const learning_rate = 0.1;


  function initialize() {

  }

  function sigmoid(e) {
    return 1 / (1 + Math.exp(-e));
  }

  function dsigmoid(sigmoid) {
    return sigmoid * (1 - sigmoid);
  }

  function feedforward(inputs) {
    inputs = mat(inputs);
    const hidden = weignts_ih.mul(inputs).add(biases_h).map(e => sigmoid(e));
    const output = weignts_ho.mul(hidden).add(biases_o).map(e => sigmoid(e));
    return output.array();
  }

  function backpropagation(inputs, targets) {
    // feedforward
    inputs = mat(inputs);
    const hidden = weignts_ih.mul(inputs).add(biases_h).map(e => sigmoid(e));
    const output = weignts_ho.mul(hidden).add(biases_o).map(e => sigmoid(e));

    // calculates errors
    const output_errors = mat(targets).sub(output).map(e => Math.pow(e, 2) * Math.sign(e));

    // adjusts gradients (dirivative of activation function --> sigmoid)
    const gradient_ho = output.map(e => dsigmoid(e)).dot(output_errors).map(e => e * learning_rate);
    const weights_ho_delta = gradient_ho.mul(hidden.transpose());
    weignts_ho = weignts_ho.add(weights_ho_delta);
    biases_o = biases_o.add(gradient_ho);

    // calculates errors
    const hidden_errors = weignts_ho.transpose().mul(output_errors);

    // adjusts gradients
    const gradient_ih = hidden.map(e => dsigmoid(e)).dot(hidden_errors).map(e => e * learning_rate);
    const weights_ih_delta = gradient_ih.mul(inputs.transpose());
    weignts_ih = weignts_ih.add(weights_ih_delta);
    biases_h = biases_h.add(gradient_ih);
  }

  return {
    initialize,
    feedforward,
    backpropagation
  }
}
