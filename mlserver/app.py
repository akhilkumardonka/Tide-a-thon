from fastapi import FastAPI
import numpy as np
from sklearn.preprocessing import StandardScaler
from xgboost import XGBRFRegressor
import pickle
import argparse
import uvicorn
import warnings  # ignore all warnings
warnings.filterwarnings('ignore')

scaler_file = 'scaler.pickle'
filename = "XGBRFRegressor.pickle"
# Loading scaler
ss = pickle.load(open(scaler_file, "rb"))
# load model
loaded_model = pickle.load(open(filename, "rb"))
# age,bmi,children,sex_male,smoker_yes,region_northwest,region_southeast,region_southwest
# unknown_customer = [[26, 31.2, 2, 1, 1, 0, 0, 0]]
# loaded_model.predict(ss.transform(unknown_customer))

app = FastAPI()


@app.get("/")
def root_function():
    return {"Message": "Run root function..."}


@app.post("/prediction/")
async def predict(age=21, bmi=23.3, children=2, sex_male=1, smoker_yes=0, region='southwest'):
    region_northwest = 0
    region_southeast = 0
    region_southwest = 0
    if region == 'northwest':
        region_northwest = 1
    elif region == 'southeast':
        region_southeast = 1
    elif region == 'southwest':
        region_southwest = 1
    unknown_customer = [[age, bmi, children, sex_male, smoker_yes,
                         region_northwest, region_southeast, region_southwest]]

    insurance_cost = loaded_model.predict(ss.transform(unknown_customer))[0]
    return {"insurance_cost": str(insurance_cost)}

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')
