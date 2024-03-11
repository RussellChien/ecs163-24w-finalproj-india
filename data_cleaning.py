import pandas as pd
import matplotlib.pyplot as plt

# main dataset is API_INDIA.csv, choose relevant variables from it and add to india_datasaet.csv
df = pd.read_csv('data/india_dataset.csv')

selected_indicators = [
    "GDP (current US$)",
    "Individuals using the Internet (% of population)",
    "Exports of goods and services (% of GDP)",
    "Industry (including construction) value added (constant 2015 US$)",
    "Foreign direct investment net inflows (% of GDP)"
]

filtered_data = df[df['IndicatorName'].isin(selected_indicators)].copy()

# Select years 1993 to 2021
years = [str(year) for year in range(1993, 2021)]
filtered_data = filtered_data[["IndicatorName"] + years]

pivoted_data = filtered_data.melt(id_vars=["IndicatorName", ], value_vars=years, var_name="Year", value_name="Value")
pivoted_data_for_d3 = pivoted_data.pivot_table(index="Year", columns="IndicatorName", values="Value", aggfunc='first').reset_index()


print(pivoted_data_for_d3)

pivoted_data_for_d3.to_csv('data/india_dataset_gdpindicators.csv', index=False, mode='w')


