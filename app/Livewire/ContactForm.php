<?php

namespace App\Livewire;

use App\Models\Contact;
use Livewire\Component;

class ContactForm extends Component
{
    public string $full_name = '';
    public string $email     = '';
    public string $subject   = '';
    public string $message   = '';
    public bool $submitted   = false;

    protected $rules = [
        'full_name' => 'required|string|min:2|max:100',
        'email'     => 'required|email',
        'subject'   => 'required|string|min:3|max:200',
        'message'   => 'required|string|min:10',
    ];

    public function submit()
    {
        $this->validate();

        Contact::create([
            'full_name' => $this->full_name,
            'email'     => $this->email,
            'subject'   => $this->subject,
            'message'   => $this->message,
            'sent_at'   => now(),
        ]);

        $this->submitted = true;
        $this->reset(['full_name', 'email', 'subject', 'message']);
        $this->dispatch('toast', message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success');
    }

    public function render()
    {
        return view('livewire.contact-form')
            ->layout('layouts.app', ['title' => 'Contact — LearnHub']);
    }
}