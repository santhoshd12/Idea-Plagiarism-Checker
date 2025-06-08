
import requests
from sentence_transformers import SentenceTransformer, util
import google.generativeai as genai

smodel = SentenceTransformer('all-MiniLM-L6-v2')

def get_embeddings(text):
    return smodel.encode(text, convert_to_tensor=True)

_get_embed = SentenceTransformer("all-MiniLM-L6-v2")
def check_similarity(idea: str,
                     items: list[dict],
                     threshold: float = 0.6) -> list[dict]:
    idea_embedding = get_embeddings(idea)
    matches = []
    for item in items:
        title = item.get('title', '')
        snippet = item.get('snippet', '')
        combined = f"{title}. {snippet}"
        link = item.get('link', '')

        search_embeddings = get_embeddings(combined)
        similarity = util.pytorch_cos_sim(idea_embedding,search_embeddings).item()

        if similarity>= threshold:
            sim_dic = {
                "title": title,
                "snippet": snippet,
                "link": link,
                "similarity": f"{similarity:.2f}"
            }
            matches.append(sim_dic)

    return matches

    
    # idea_vec = _get_embed.encode(idea, convert_to_tensor=True)
    # matches  = []

    # for rec in items:
    #     combo = f"{rec.get('title','')}. {rec.get('snippet','')}"
    #     sim   = util.pytorch_cos_sim(
    #                idea_vec,
    #                _get_embed.encode(combo, convert_to_tensor=True)
    #            ).item()
    #     if sim >= threshold:
    #         val = {"title": rec.get("title", ""),
    #                "snippet": rec.get("snippet", ""),
    #                "link": rec.get("link", "")}
            
    #         val["similarity"] = round(sim, 3)
    #         matches.append(val)

    # print("Printing....",matches)
    # return matches


def web_search(query ):
    apikey = "your api key "

    cx = "your cx
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key" : apikey,
        "cx" : cx,
        "q" : query
    }

    response = requests.get(url=url,params=params)
    result = response.json()

    print("Status Code:", response.status_code)
    items = result.get("items", [])
    
    
    try:
        return items
    except Exception as e:
        print("Error converting to JSON:", e)
        return {"No results found."}





def generate_tip(idea):
    genai.configure(api_key="your api key ")
    
    model = genai.GenerativeModel("models/gemini-1.5-flash")  # Use the appropriate model name
    print(idea)

    prompt = f"""You are a startup innovation expert. 
Given the idea below, suggest 5 to 10 one-line tips to make the idea more unique and innovative, helping it stand out from existing solutions.

Idea: {idea}

Give only the tips as a numbered list with no extra explanation."""

    response = model.generate_content(prompt) 
    tip_text = response.text.strip()

    tips = [line.split(".", 1)[1].strip() for line in tip_text.splitlines() if line.strip() and line[0].isdigit()] 
    print(tips)
    return tips if tips else ["No tips found."]
    
