import sys
import difflib
import re

# 可选：导入sklearn相关包，计算TF-IDF及余弦相似度
try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
except ImportError:
    TfidfVectorizer = None
    cosine_similarity = None

def preprocess_markdown(text):
    """
    预处理Markdown文本：
    1. 去除代码块
    2. 去除Markdown格式标记，如标题、列表标记等
    3. 转换为小写，并去除多余的空格
    """
    # 去除代码块（```开头和结尾之间的内容）
    text = re.sub(r'```[\s\S]*?```', '', text)
    # 去除行内代码标记及反引号
    text = re.sub(r'`[^`]*`', '', text)
    # 去除标题标记和列表符号
    text = re.sub(r'(^|\n)(\s*#+\s*|\s*[-*+]\s+)', r'\1', text)
    # 去除多余空白、转换为小写
    text = text.lower().strip()
    return text

def compute_difflib_similarity(text1, text2):
    """利用difflib计算相似度，返回一个介于0到100的百分比"""
    matcher = difflib.SequenceMatcher(None, text1, text2)
    return matcher.ratio() * 100

def compute_tfidf_cosine_similarity(text1, text2):
    """利用TF-IDF和余弦相似度的方式计算相似度"""
    if TfidfVectorizer is None or cosine_similarity is None:
        print("Sklearn is not installed; TF-IDF similarity cannot be computed.")
        return None
    vectorizer = TfidfVectorizer().fit([text1, text2])
    tfidf = vectorizer.transform([text1, text2])
    cosine_sim = cosine_similarity(tfidf[0], tfidf[1])[0][0] * 100
    return cosine_sim

def main(file1_path, file2_path):
    try:
        with open(file1_path, 'r', encoding='utf-8') as f:
            content1 = f.read()
        with open(file2_path, 'r', encoding='utf-8') as f:
            content2 = f.read()
    except Exception as e:
        print(f"无法读取文件：{e}")
        sys.exit(1)

    # 预处理文本
    processed1 = preprocess_markdown(content1)
    processed2 = preprocess_markdown(content2)

    # 方式1: difflib相似度
    diff_similarity = compute_difflib_similarity(processed1, processed2)

    print("基于difflib的相似度: {:.2f}%".format(diff_similarity))

    # 方式2: 基于TF-IDF和余弦相似度（如果sklearn可用）
    tfidf_similarity = compute_tfidf_cosine_similarity(processed1, processed2)
    if tfidf_similarity is not None:
        print("基于TF-IDF和余弦相似度的相似度: {:.2f}%".format(tfidf_similarity))
    else:
        print("未安装sklearn库，跳过TF-IDF相似度计算。")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("用法: python markdown_similarity.py file1.md file2.md")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
