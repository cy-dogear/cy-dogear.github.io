# Dot2Dot

> **An interest‑based connection platform powered by AI content filtering.**  
> *有道德 · 慢车马 · 轻量化* – Find resonant people, not noise.

🔗 **Try it now**: [https://cy-dogear.github.io/dot2dot/](https://cy-dogear.github.io/dot2dot/)

📖 **[中文说明](./README_ZH.md)**

---

## What is Dot2Dot?

Dot2Dot is a **social platform** that uses AI to semantically analyze user‑generated content.  
Content that aligns with healthy values is **statistically more likely to be shown**, while low‑quality or distracting content is naturally deprioritized – without being outright banned.

- Supports Chinese, English, Russian, and other languages.
- Anyone can use it, and everyone has a fair chance to find people who share their interests and values.

### Registration & Contact

- You register with an email address, which is displayed on your profile (no password is required for login).
- This old‑fashioned, non‑real‑time contact method is intentional – it helps users feel more secure.
- Want to use another way to connect? Feel free to share it peer‑to‑peer.
- If you are not willing to disclose an email address at all, this platform may not be for you.

---

## Positioning

**“To find the dot‑to‑dot connection, to see a spiritual way of life.”**

- ❌ Dot2Dot is **not** a dating app.
- ❌ It is **not** a traditional BBS.
- ✅ It **is** a place to share your spiritual life.
- ✅ It **is** a place where “resonant people” can contact you via email.

---

## Quick Start

1. Visit [https://cy-dogear.github.io/dot2dot/](https://cy-dogear.github.io/dot2dot/)
2. Register with your email address (no verification required).
3. Post your first message – AI will handle the rest.

No installation required. Just a browser.

---

## How It Works (Concept Design)

The product positioning is achieved through two complementary strategies:

### 1. Subtraction

We deliberately remove features that are not essential to the core mission:

- No profile pictures, gender, age, occupation, or follower/following lists.
- No comments, likes, or private chat.
- No images or videos – only plain text.
- Each user can post multiple messages per day, but the platform only shows **one new message per user per day** (others are queued).
- Each user has a **maximum of 20 visible messages** (FIFO – oldest are removed automatically).
- Inactive accounts are deleted after prolonged absence (re‑registration is always free).

### 2. AI‑Powered Filtering

Quality content is prioritized through a multi‑step AI pipeline:

- **Message tagging** – semantic analysis of each post.
- **User tagging** – aggregation of a user’s content tendencies.
- **User weighting** – dynamic scoring based on value alignment.
- **Discovery & matching** – show resonant content with higher probability.

For a detailed breakdown of the algorithm, see:  
📄 [Message_tag & User_tag mechanism](./design-record-doc/message-tag.md)  
📄 [User_weight calculation](./design-record-doc/user-weight.md)  
📄 [Discovery & matching logic](./design-record-doc/matching.md)  

**Algorithm flow overview:**  
![Algorithm flow](./image/algorithm-flow.png)


---

## Summary

| Feature | Dot2Dot |
|---------|---------|
| **Ethical** | No addiction loops, no engagement traps. |
| **Slow‑paced** | One visible post per user per day. |
| **Lightweight** | Pure text, no images/videos. |
| **AI‑driven** | Semantic filtering for quality content. |
| **Private by default** | Email‑based, no real‑time chat. |

> AI semantic parsing and filtering algorithms are the technical means to realize this product positioning.

Initial implementation: [https://cy-dogear.github.io/dot2dot/](https://cy-dogear.github.io/dot2dot/)

---

## License

This project is open source. See the [LICENSE](./LICENSE) file for details.