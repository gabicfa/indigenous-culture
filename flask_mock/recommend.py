import pandas as pd
from scipy.spatial.distance import cosine

def getScore(history, similarities):
    return sum(history * similarities)/sum(similarities)

def get_recommended_item(user_id,table, labels):
    df = pd.DataFrame.from_records(table, columns=labels)
    temp_df = df.drop('user', axis=1)

    data_ibs = pd.DataFrame(index=temp_df.columns,columns=temp_df.columns)
    for i in range(0,len(data_ibs.columns)) :
        for j in range(0,len(data_ibs.columns)) :
            data_ibs.iloc[i,j] = 1-cosine(temp_df.iloc[:,i],temp_df.iloc[:,j])

    data_neighbours = pd.DataFrame(index=data_ibs.columns,columns=range(1,4))

    for i in range(0,len(data_ibs.columns)):
        data_neighbours.iloc[i,:3] = data_ibs.iloc[0:,i].sort_values(ascending=False)[:3].index

    data_sims = pd.DataFrame(index=df.index,columns=df.columns)
    data_sims.iloc[:,:1] = df.iloc[:,:1]
    for i in range(0,len(data_sims.index)):
        for j in range(1,len(data_sims.columns)):
            user = data_sims.index[i]
            product = data_sims.columns[j]        
            if df.loc[i][j] == 1:
                data_sims.iloc[i][j] = 0
            else:
                product_top_names = data_neighbours.loc[product][1:3]
                product_top_sims = data_ibs.loc[product].sort_values(ascending=False)[1:3]
                user_purchases = temp_df.loc[user,product_top_names]
    
                data_sims.iloc[i][j] = getScore(user_purchases,product_top_sims)

    data_recommend = pd.DataFrame(index=data_sims.index, columns=['user','1','2','3'])
    data_recommend.iloc[0:,0] = data_sims.iloc[:,0]
    for i in range(0,len(data_sims.index)):
        data_recommend.iloc[i,1:] = data_sims.iloc[i,:].sort_values(ascending=False).iloc[1:2,].index.transpose()
    print(data_recommend.iloc[:][:])
    recommended_item = data_recommend.loc[df['user'] == user_id]
    print(recommended_item["2"].values[0])
    return recommended_item["1"].values[0]