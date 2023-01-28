package com.magnit.api.controller;

import com.magnit.api.models.Question;
import com.magnit.api.payload.QuestionDTO;
import com.magnit.api.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@RestController
public class QuestionController {

    @Autowired
    QuestionRepository questionRepository;

    @GetMapping("/welcome")
    public String satWelcome(){
        return "code with magnit hachathon...";
    }

    @GetMapping("/questions")
    public List<Question> getAll(){
       return  questionRepository.findAll();
    }

    @GetMapping("/question/{queId}")
    public List<Question> getQuestionById(@PathVariable("queId") Long queId){
        List<Question> questions =   questionRepository.findByQueId(queId);
        return  questions;
    }

    @GetMapping("/getEmpId")
    public Long getCurrentUser(){
      List<Question> questions=  questionRepository.findAll();
        if(!questions.isEmpty())
            return questions.get(questions.size()-1).getEmp_id();
        return 100l;
    }
    @PostMapping("/question")
    public List<QuestionDTO> saveQuestions(@RequestBody List<QuestionDTO> questionDTOs) {
        questionDTOs.forEach(data->{
            Question question = new Question();
            question.setQueId(data.getQ_id());
            question.setTitle(data.getTitle());
            question.setSelected(data.getSelected());
            question.setType(data.getType());
            question.setEmp_id(data.getEmp_id());
            question.setCreatedDate(new Date());
            question.setComment(data.getSuggestion());
            question.setWeight(data.getWeight());
            questionRepository.save(question);
        });

    return questionDTOs;
    }


}
