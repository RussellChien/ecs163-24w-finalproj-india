import pandas as pd
import matplotlib.pyplot as plt

# main dataset is API_INDIA.csv, choose relevant variables from it and add to india_datasaet.csv
df = pd.read_csv('data/india_dataset.csv')

# can use this for initial data visualizations, move to d3 later
print(df)