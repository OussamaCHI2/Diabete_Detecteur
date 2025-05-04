from flask import Flask, request, jsonify
import numpy as np
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load the model and scaler
models = {
    1: joblib.load('Models/modelLR.pkl'),
    2: joblib.load('Models/model_DecisionTree.pkl'),
    3: joblib.load('Models/modelSVC.pkl'),
    4: joblib.load('Models/modelknn.pkl'),
    
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Log incoming data for debugging
        print("Incoming data:", data)

        # Extract input features from the request data
        features = [
            data.get('Pregnancies'),
            data.get('Glucose'),
            data.get('BloodPressure'),
            data.get('SkinThickness'),
            data.get('Insulin'),
            data.get('BMI'),
            data.get('DiabetesPedigreeFunction'),
            data.get('Age')
        ]
        
        # Ensure all features are numerical
        if any(f is None for f in features):
            return jsonify({'error': 'Missing or invalid feature values'}), 400
       

        # Get model_id from the data
        model_id = int(data.get('model_id'))
        

        # Ensure the model_id is valid
        if model_id not in models:
            return jsonify({'error': 'Invalid model ID'}), 400

        # Select the model based on model_id
        model = models[model_id]
        scaler = joblib.load('Models/scaler.pkl')
        # Convert features into a numpy array and reshape for prediction
        features = np.array(features).reshape(1, -1)
        scaled=scaler.transform(features)

        # Make the prediction
        prediction = model.predict(scaled)
        print(prediction,'this is the prediction')

        # Return the prediction result
        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        # Print the exception to the console for debugging
        print("🔥 Internal server error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
