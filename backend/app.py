from flask import Flask,request,jsonify
from flask_cors import CORS
from checker import check_similarity,web_search,generate_tip

app = Flask(__name__)
CORS(app)

@app.route("/api/check",methods=["POST"])
def check():
    data = request.get_json()
    idea = data.get("idea","")
    print(idea)
    results1 = web_search(idea)

    # results2 = web_search(f"{idea} ieee")


    # combined_data = results1
    

    # combined_data.extend(results2)
    # print(results1)
    combined_results = {"data": results1}

    result = check_similarity(idea, results1, threshold=0.65)

    
    if not idea:
        return jsonify({"error":"No idea provided"}),400
    
    # result = check_similarity(idea)
    # print(result)
    return jsonify({"result":result})

@app.route("/api/tip",methods = ["POST"])
def tip():
    data = request.get_json()
    idea = data.get("idea","")
    tips = generate_tip(idea)
    if not idea:
        return jsonify({"error":"No idea provided"}),400
    
    return jsonify({"tips": tips })




if __name__=="__main__":
    app.run(debug=True)