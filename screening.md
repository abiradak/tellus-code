1.Can you describe a large-scale system you’ve worked on with Node.js? What architectural choices did you make and why?
Ans: I architected and developed a real-time fantasy gaming platform that scaled to over 100K registered users, with 30–50K concurrent users during peak hours. 
Initially, the platform was built as a Node.js monolithic application with a few supporting microservices written in Node.js and PHP (CodeIgniter). 
However, as traffic grew, we began experiencing 502/504 gateway errors during peak load, primarily due to server bottlenecks and limited scalability.
To overcome these issues, I redesigned the architecture to be 90% serverless, leveraging AWS Lambda and Google Cloud Functions to handle business logic and scale automatically. 
The APIs were routed through API Gateway with load balancing, ensuring smooth and reliable performance without downtime. For data storage, 
I adopted a hybrid database approach — using DynamoDB and Firestore as the primary databases for their cost-effective, request-based billing and auto-scaling, while maintaining an SQL backup for analytical and relational queries.
To optimize performance, I integrated Redis as a high-speed caching layer between the application and databases. Notifications were powered by AWS SNS, ensuring real-time message delivery. 
For static assets, I utilized AWS S3 with CloudFront and GCP Buckets as a CDN, significantly improving global content delivery speeds.
The platform also required real-time data scraping and live video streaming from multiple event sources (ODDS). 
For this, I used DigitalOcean and AWS EC2 instances running Node.js child processes to handle scraping efficiently, storing the results in Redis and the main database, and broadcasting updates via WebSockets to all active users. 
ANT Media Server was employed for low-latency live streaming, ensuring a seamless viewing experience.
To maintain security and reliability, I configured Cloudflare DNS for DDoS protection, bot mitigation, and WAF filtering. Additionally, I implemented rate limiting at the application level to prevent abuse and malicious API calls. 
For authentication, I integrated Firebase Auth with custom JWTs and AWS IAM role-based access control, ensuring both scalability and secure session management.
Overall, this architecture delivered a resilient, scalable, and cost-efficient system capable of handling high user concurrency, real-time updates, and live streaming without service degradation.

2. How do you typically structure collaboration between frontend and backend teams?
Ans: In my experience, collaboration between frontend and backend teams depends on the team size and project scale. Since our team was relatively small, i followed a lightweight, fast-moving, and highly collaborative.
i usually started by aligning on feature requirements and API contracts together. I’d sit with the frontend developers to discuss data structures, request/response formats, and how the UI and backend would interact. 
We documented these in Postman collections or Swagger, which allowed the frontend to build against mock APIs while backend logic was still being finalized — enabling true parallel development.
Communication was very direct — mostly through Slack or quick huddles, and we used tools like GitHub + Jira for tracking and version control. We didn’t overcomplicate processes, but we maintained clear ownership — so everyone knew which modules or endpoints they were responsible for.
During integration, we did joint testing sessions to validate APIs and ensure the data flow matched UI expectations. I also encouraged using consistent naming conventions, error handling, and shared utility libraries to keep the frontend–backend interface smooth.
using API versioning, CI/CD pipelines, automated + Manual testing — to ensure our system remained stable, scalable, and maintainable.

3.What’s your approach to authentication and authorization in a full stack app?
Ans: It depends on your type Of application. For And Example If we Using Serverless / Microservice Based Application we need To use OAuth2 / Firebase Auth / AWS IAM For (GCP Functions / Lambdas (Lambda Authorizers))
and If we need extra Bit Of layer using Custom Auth To manupulate The Authorization As well For The Role Based RBCA then we have to create the Coustom Token And In that token we have to pass the 
Authorization Access as well So That According To that we can set The Frontend and When Requesting we can easily Filter Out Based On Role.
For The Two Way Encryption We can Use SHA-256 Crypto IV based Both way Encryption And Decryption.

4.Have you worked with different types of databases? How do you decide when to use a document store vs. a graph database vs. relational?
Ans: Yes I have Worked with Multiple Types Of Databases Like Relational (Sql/PostGres) , Documnet Based ( Firestore/  Dynamodb/ Mongo) AND Key value( Redis) As per The need.
I decide Them like when strong consistency and complex relational integrity are primary we use sql / PostGres Like In CMS / Ecomm platforms where security is the major concern.
And The Documnet Based Db we can use in The hybrid / dynamic projects where we need flexible schemas, fast iteration. i have't used any GraphDb but will explore them sure.

5. How do you ensure your applications are secure and maintainable over time?
Ans: As a frontend Prospective we have to use CSP, secure cookies, input validation, parameterized queries/ORM to avoid injection.
Prevent any secret directly in Code. Have to Use SSL with Cloudflare for DNS for safe side.
As a backend prospective we have to use crypto for Both Side Encryption Decryption So that we dont have to worry about data manupulation.
And ratelimiiting , Setup Logs For All actions. 

Maintainability: small services/modules with clear boundaries and interfaces, Need keep Doc , README, architecture diagrams, Need to use Git As versioning.

6.What’s your approach to testing across backend and frontend layers?
Ans: Frontend: Component tests , Api Integration tests , Load Test (Images/Resources)
Backend: Unit tests for pure logic , Api Test , Load Test 
And we have to test for the both backend and frontend team avoid integration surprises

7.Can you tell me about a challenging performance or scalability problem you solved?
Ans: I alrady Explained How I improved the 502/503 (Increased users) and Chnaged The Structure to serverless architechture (AWS Lambda, Api Gatewaye/ Route53/ AWS IAM/ Redis) to give users a seamless Experience.
If U ask Specifically i have successfully Prevented a Ddos attack By reading and Finding The cause First And The Taking Preventions In The The Code Level And DNS as well.
rest i have restructured an Old Ecom Platform To Serverless Application . Designed Script For Single Time Application backup.

8.Have you worked with cloud or container platforms? How do you decide between serverless and containerized approaches?
Ans: I have used AWS (ECS/Lambda), GCP (Cloud Run), and container tooling Docker.
We have to use Serverless (Lambda/Cloud Run) for unpredictable, event-driven workloads where you want minimal ops and reasonable cold start apps and its Great for cron jobs, webhooks, lightweight APIs.
And On the other side Containerized for long-running services, heavy CPU-bound tasks mainly when you need control over networking, stateful apps.
in serverless you don't have to do that much infra management rather than Containerized. but in case of real time apps containerized preferred as cloud starts as cold and u can control more.
cloud is more cost effective than containerized.

9.How do you keep a large codebase healthy when multiple teams contribute?
Ans: Strictly Define The code owners as per module . Automated linting, formatting, and type checks must be same for all The teams.
using the approval from owner Small pull requests and fast code review every time. prevent main branch Form any action.
Good Documnetation For everything. 

10.Have you introduced or influenced a technical decision that had long-term impact?
Ans: Yes one of my system we used to declare events In Fifo Concept And using child process But its was taking time as each declaration was depends on the 
one wallet system. I introduced redis-pub sub and Created a centralized Wallet system and Interlocking system that reduces several prechecks
and the imporvement was there.

11.How do you handle working with stakeholders outside engineering (e.g., product managers, QA, designers)?
Ans: For Designers i was connected directly with them discussing the criteria , figma building and  everything. But when i planned a structural change or anything like that
i often build a short demo connect with the product managers and demo it to him to get the feedback futher deploymnet. Also in week 3 days Post-launch i sit with stakeholders review metrics and iterate everything.
with QA team same i meet once a day and Checked All good.

12. What are you most proud of in your career so far?
Ans: In my career i stayed loyal for my company and I created everything as our team was small. And I learned in various fields Not only coding , developers
Communication with clients.

Thanks
Abir Adak


